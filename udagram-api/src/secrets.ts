import AWS = require('aws-sdk');
import {config} from './config/config';

export function setSecrets()
{
    const client = new AWS.SecretsManager({
        region: "us-east-1"
    });

    client.getSecretValue({SecretId: "monolith_to_microservices_secret"}, function(err, data) {
        if (err) {
            if (err.code === 'DecryptionFailureException')
                // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InternalServiceErrorException')
                // An error occurred on the server side.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InvalidParameterException')
                // You provided an invalid value for a parameter.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InvalidRequestException')
                // You provided a parameter value that is not valid for the current state of the resource.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'ResourceNotFoundException')
                // We can't find the resource that you asked for.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
        }
        else {
            // Decrypts secret using the associated KMS CMK.
            // Depending on whether the secret is a string or binary, one of these fields will be populated.
            data.SecretString;

            const secret = JSON.parse(data.SecretString);
            config.database = secret.POSTGRES_DATABASE,
            config.username = secret.POSTGRES_USERNAME,
            config.password = secret.POSTGRES_PASSWORD,
            config.jwt.secret = secret.JWT_SECRET,
            config.host = secret.POSTGRES_HOST
        }
        
        // Your code goes here. 
    });
}


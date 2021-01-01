import AWS = require('aws-sdk');
import {config} from './config/config';

export function setSecrets()
{
    const client = new AWS.SecretsManager({
        region: "us-east-1"
    });

    client.getSecretValue({SecretId: "monolith_to_microservices_secret"}, function(err, data) {
        if (err) {
            console.log(JSON.stringify(err));
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


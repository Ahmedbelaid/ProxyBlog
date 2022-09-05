import jwt from 'jsonwebtoken';
import  config from '../config/config';
import logging from '../config/logging';
import { IWriter } from '../Types/IWriter';

const NAMESPACE = 'Auth';

const signJWT = (writer : IWriter, callback: (error: Error | null, token: string | null) => void): void =>{
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;    
    var expirationTimeInSeconds = Math.floor(expirationTime/ 1000);

    logging.info(NAMESPACE, `Attemping to sign token for ${writer.username}`);

    try 
    {
        jwt.sign ({

            username: writer.username
        },
        config.server.token.secret,
        {
            issuer: config.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        },
        (error, token) => {
            if (error) {
                callback(error, null);
            } else if (token) {
                callback(null, token);
            }
        }
    );
} catch (error) {
   
    callback(error as any, null);
}
};

export default signJWT;
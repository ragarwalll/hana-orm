import hana from '@sap/hana-client';
import xsenv from '@sap/xsenv';

export interface ConnectionParams {
  lastUpdated?: Date;
  conn?: hana.Connection;
}

export const connection: ConnectionParams = {};

export const hanaConfig = () => {
  return xsenv.cfServiceCredentials({ tag: 'hana' });
};

export const createClient = (config: hana.ConnectionOptions) => {
  return new Promise<hana.Connection>((resolve, reject) => {
    const conn = hana.createConnection(config);
    try {
      conn.connect((err) => {
        if (err) reject(err);
        connection.conn = conn;
        connection.lastUpdated = new Date();
        resolve(conn);
      });
    } catch (error) {
      reject(error);
    }
  });
};

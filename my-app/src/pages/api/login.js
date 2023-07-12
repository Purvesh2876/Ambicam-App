import axios from 'axios';
import { parseStringPromise } from 'xml2js';
const apiBaseUrl = '/api';

export async function login(email, password, langflag) {
    const url = `${apiBaseUrl}`; // Replace with your actual backend URL
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Header>
        <AuthHeader xmlns="http://tempuri.org/">
          <UserName>vmukti</UserName>
          <Password>5zqLSce7YhbyBxAwb14wc8G3R84iWXfg:yLsAV3mSMNVnW++aM7TlkJ6N+k83E1xQ</Password>
        </AuthHeader>
      </soap12:Header>
      <soap12:Body>
        <Login xmlns="http://tempuri.org/">
          <email>${email}</email>
          <password>${password}</password>
          <langflag>${langflag}</langflag>
        </Login>
      </soap12:Body>
    </soap12:Envelope>`;

  try {
    const response = await axios.post(url, soapRequest, {
      headers: {
        'Content-Type': 'application/soap+xml',
      },
    });

    const xmlResponse = response.data;
    const loginResult = await extractLoginResult(xmlResponse);

     // Extract user details from the login result (assuming the result format is "SUCCESS:userId")
    //  const [status, userId] = loginResult.split(':');
    //  const userDetails = {
    //    status,
    //    userId,
    //    email
    //  };
    //  console.log(userDetails);
     
    return loginResult;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred');
  }
};

async function extractLoginResult(xmlResponse) {
  const result = await parseStringPromise(xmlResponse, {
    explicitArray: false,
    ignoreAttrs: true,
  });
  const envelope = result['soap:Envelope'];
  const body = envelope['soap:Body'];
  const loginResponse = body.LoginResponse;
  const loginResult = loginResponse.LoginResult;
  // console.log(loginResult)
  return loginResult;
}

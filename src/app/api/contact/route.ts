import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const object = await req.json();
    
    // The server securely appends the private access key without exposing it to the browser
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || '5c40ad72-eedb-4e5a-a1e7-53faf8f1e868';
    object.access_key = accessKey;

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(object)
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.warn('Web3Forms returned non-JSON:', responseText);
      data = { message: 'Unexpected response from mail server.' };
    }
    
    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ success: false, message: data.message || 'Error from Web3Forms' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error securely proxying form submission:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

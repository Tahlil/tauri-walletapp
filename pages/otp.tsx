import { NextPage } from "next";
import router from "next/router";
import React, {useState} from "react";

const OTPPage: NextPage = () => {
    const phone = localStorage.getItem("number") as string
    const obscuredPhone = "***" + phone.slice(4,8) + "*****"
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    const digitValidate = function(elm: any){
        console.log(elm.target.value)
        elm.target.value = elm.target.value.replace(/[^0-9]/g,'');
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        
        const code = code1.toString() + code2.toString() + code3.toString() + code4.toString()
        const rawResponse = await fetch(baseURL + "verifyOTP", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone: phone, otpCode: code }),
          });
          const content = await rawResponse.json();
          console.log(content);
          if(content.success){
              router.push("/start");
          }
      };
      
    const tabChange = function(val: number){
        let ele = document.querySelectorAll('input');
        if(ele[val-1].value != ''){
            ele[val].focus()
        }else if(ele[val-1].value == ''){
            ele[val-2].focus()
        }   
    }
  return (
    <div
     className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12"
     style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1598798710023-8682deb58a8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80')",
      }}
     >
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Phone number Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your phone number {obscuredPhone}</p>
        </div>
      </div>

      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-blue-900"
                value={code1}
                onChange={e => { setCode1(e.currentTarget.value); }} 
                type="text" name="" id="" maxLength={1} 
                onInput={(e) => digitValidate(e)} 
                onKeyUp={(e) => tabChange(1)}
                />
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-blue-900"
                value={code2}
                onChange={e => { setCode2(e.currentTarget.value); }} 
                type="text" name="" id="" maxLength={1} onInput={(e) => digitValidate(e)} onKeyUp={(e) => tabChange(2)}/>
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-blue-900"
                value={code3}
                onChange={e => { setCode3(e.currentTarget.value); }} 
                type="text" name="" id="" maxLength={1} onInput={(e) => digitValidate(e)} onKeyUp={(e) => tabChange(3)}/>
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-blue-900"
                value={code4}
                onChange={e => { setCode4(e.currentTarget.value); }} 
                type="text" name="" id="" maxLength={1} onInput={(e) => digitValidate(e)}/>
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button type="submit" className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                  Verify Account
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  );
};

export default OTPPage;
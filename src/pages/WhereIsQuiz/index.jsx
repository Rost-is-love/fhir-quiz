import "../../App.scss";
import React, { useState, useEffect } from "react";

function submitForm() {

}

export default function QuestionSuggestionPage() {
  return (
    <div>
      <h1 className=" tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold ">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
          Where is the quiz?
        </span>
      </h1>

      <div className="text-white  tracking-wide leading-6 mb-7">
        Probably you clicked on this button to know more about our party mode quiz.

        Organization of the qiuz competition is a complex and exciting process. We are planning to collect more questions and create a platform, that will allow you to play in teams and learn FHIR in fun way. We will be happy to organize it in the future.

        If you and your colleagues want to participate in our party mode quiz let, please, us know by submitting the form.

        If you have any ideas on how to create the perfect party mode quiz and you are ready to share it with us, let\'s create it together!

        To apply for the waiting list or submit cooperation fill this form:
      </div>


    <div>

      <input className="rounded-xl text-black py-2 px-4 outline-0" placeholder="Email"/>
      <br />


      <textarea className="outline-0 rounded-2xl text-black w-2/3 p-4 mt-4" placeholder="Your suggestion..." />

      <div className="w-40">
        <div className="cursor-pointer flex mt-4 p-1 gap-x-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600" onClick={(e) => submitForm(e)}>
          <a className="tracking-wide p-2 flex rounded-xl text-xl font-medium justify-center w-full bg-transparent hover:text-white duration-500">
            Submit
          </a>
        </div>
      </div>
    </div>

    </div>
  );
}

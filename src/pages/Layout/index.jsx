import "../../App.scss";

function Link({text, href}) {
    return (
        <a href={href} className="cursor-pointer underline leading-loose font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600 transition-all duration-1000 hover:from-pink-600 hover:to-yellow-400">{text}</a>
    );
}

function logout() {
    console.log("logout");
}

export default function LogInPage({children}) {
    return (
        <div className="">
            <div className="mt-4 mb-12 mx-4 flex justify-between text-white">

                <div className="text-3xl font-bold leading-normal text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">FHIR quiz</div>

                <div className="flex items-center gap-4">
                    <Link text="Where is quiz?" href="#/where-is-quiz" />
                    <Link text="Questions" href="#/questions" />

                    vganshin
                    <div>
                        <img className="rounded-full w-10" src="https://avatars.githubusercontent.com/u/1931520?v=4" />
                    </div>

                    <div className="cursor-pointer" onClick={(e) => logout()} >→</div>

                </div>

            </div>

            <div className="root text-white text-center grow">
                {children}
            </div>

            <div className="root flex shrink-0 basis-auto justify-between items-end pt-20 pb-4 z-100">
                <div>
                    <Link text="Suggest question" href="#/suggest" />
                    <br />
                    <Link text="Authors" href="#/authors" />
                </div>
                <div className="text-white">
                    Developed at <a className="underline" href="https://health-samurai.io" target="_blank">HealthSamurai</a>. Powered by <a className="underline" href="https://aidbox.app" target="_blank">aidbox.app</a>.
                    <br />

                    <a className="underline flex items-center cursor-pointer" href="https://github.com/Rost-is-love/fhir-quiz" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 32 32"
                             className="w-5 h-5 fill-current mr-1">
                            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                    GitHub</a>
                </div>
            </div>


        </div>
    );
}


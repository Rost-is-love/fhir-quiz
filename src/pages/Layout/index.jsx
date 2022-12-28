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

            <div className="root flex shrink-0 basis-auto justify-between items-end pt-20 pb-4">
                <div>
                    <Link text="Suggest question" href="#/suggest" />
                    <br />
                    <Link text="Authors" href="#/authors" />
                </div>
                <div className="text-white">
                    Developed at <a className="underline" href="https://health-samurai.io" target="_blank">HealthSamurai</a>. Powered by <a className="underline" href="https://aidbox.app" target="_blank">aidbox.app</a>.
                </div>
            </div>

        </div>
    );
}

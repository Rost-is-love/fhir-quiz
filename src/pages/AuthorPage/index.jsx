import "../../App.scss";

function Person({name, avatarUrl, github}) {
  return (
      <a href={"https://github.com/" + github} target="_blank" rel="noreferrer">
          <div className="flex flex-col gap-4">
              <img className="rounded-full w-32" src={avatarUrl} alt={name}/>
              <div className="text-white">{name}</div>
          </div>
      </a>
  );
}

export default function AuthorPage() {
  return (
      <div className="">
          <div className="">

              <div>
                  <h1 className=" tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold ">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
                          About
                      </span>
                  </h1>

                  <div className="leading-6 text-white tracking-wide mb-7">We believe in this project.</div>

                  <h1 className=" tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold ">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
                          Authors
                      </span>
                  </h1>


                  <div className="flex text-center  gap-10">
                      <Person name="Vlad Ganshin" github="vganshin" avatarUrl="https://avatars.githubusercontent.com/u/1931520?v=4" />
                      <Person name="Rostislav Antonov" github="Rost-is-love" avatarUrl="https://avatars.githubusercontent.com/u/67863957?v=4" />
                      <Person name="Ilya Eremeev" github="eremec" avatarUrl="https://avatars.githubusercontent.com/u/38000648?v=4" />
                      <Person name="Pavel Sadovnikov" github="Yers1n1a" avatarUrl="https://avatars.githubusercontent.com/u/32289620?v=4" />
                      <Person name="Varvara Semenova" github="VarvaraSemenova" avatarUrl="https://avatars.githubusercontent.com/u/30662300?v=4" />
                  </div>
              </div>
          </div>
      </div>
  );
}

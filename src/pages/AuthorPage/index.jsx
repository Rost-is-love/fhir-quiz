import "../../App.scss";

function Person({name, avatarUrl, github}) {
  return (
    <a href={"https://github.com/" + github} target="_blank">
     <div>
      <img className="rounded-full w-40" src={avatarUrl} />
        <div className="text-white">{name}</div>
        </div>
        </a>
    );
}

export default function AuthorPage() {
  return (
    <div className="first">
    <div className="first__container">
      
      <div>
      <h1 className="text-7xl mb-7 font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
            Authors
      </h1>
      

<div className="flex text-center  gap-10">
       <Person name="Vlad Ganshin" github="vganshin" avatarUrl="https://avatars.githubusercontent.com/u/1931520?v=4" />
       <Person name="Rostislav Antonov" github="Rost-is-love" avatarUrl="https://avatars.githubusercontent.com/u/67863957?v=4" />
       <Person name="Pavel Sadovnikov" github="Yers1n1a" avatarUrl="https://avatars.githubusercontent.com/u/32289620?v=4" />
       <Person name="Ilya Eremeev" github="eremec" avatarUrl="https://avatars.githubusercontent.com/u/38000648?v=4" />
       <Person name="Varvara Semenova" github="VarvaraSemenova" avatarUrl="https://avatars.githubusercontent.com/u/30662300?v=4" />
</div>

<div className="pt-20 text-center text-white">Powered by <a className="underline" href="https://aidbox.app">Aidbox</a>.</div>

{/*<img src="https://aidbox.app/static/assets/img/aidbox-logo.svg" />*/}

    </div>
    </div>
    </div>
  );
}
// components/LumaEmbed.tsx

const LumaEmbed: React.FC <{slug:string}> = ({slug}) => {
    const src:string="https://lumalabs.ai/embed/"+slug+"?mode=lf&background=%23ffffff&color=%23000000&showTitle=true&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=true"
    return (
      <iframe
        src={src}
        width="889"
        height="500"
        frameBorder="0"
        title="luma embed"
        style={{ border: "none" }}
      />
    );
  }
  
  export default LumaEmbed;
  
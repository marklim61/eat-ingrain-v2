const BackgroundBanner = ({ bgImage }) => {
    return (
      <div className="absolute inset-0 bg-cover bg-center bg-neutral-950 h-screen w-full z-0">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            opacity: 0.2,
          }}
        />
      </div>
    );
  };
  
  export default BackgroundBanner;
  
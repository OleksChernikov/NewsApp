import videoFile from "../assets/854518-hd_1920_1080_30fps.mp4";

export default function Header() {
  return (
    <header className="site__header header">
      <div className="header__video-wrap">
        <video
          className="header__video"
          src={videoFile}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="header__overlay">
        <h1 className="header__title">Web News</h1>
        <p className="header__subtitle">Latest world articles</p>
      </div>
    </header>
  );
}
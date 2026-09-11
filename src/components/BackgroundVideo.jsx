const BACKGROUND_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4";

export function BackgroundVideo() {
  return (
    <div className="bg" aria-hidden="true">
      <video
        className="bg-video"
        data-testid="background-video"
        src={BACKGROUND_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="bg-shade" />
      <div className="bg-grain" />
    </div>
  );
}

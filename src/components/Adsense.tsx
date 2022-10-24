import { useRouter } from "next/router";
import { useEffect } from "react";

declare global {
  var adsbygoogle: unknown[];
}

export const AdSense = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error(error);
    }
  }, [asPath])
  return (
    <div key={asPath}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3880001846776098"
        data-ad-slot="5608691618"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
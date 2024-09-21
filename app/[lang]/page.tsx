export default async function Page({
  params: { lang },
}: {
  params: { lang: 'ko' | 'en' };
}) {
  const dict = await import('../../dictionaries/header.json').then(
    (module) => module.default,
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-grayscale-700">
      <button>{dict['기업정보'][lang]}</button>
      <div className="bg-primary-light">white</div>
      <div className="bg-blackAlpha-30">white alpha</div>
      <div className="typo-BodyCaptionBold">caption bold</div>
      <div className="typo-BodyLargeRegular">caption bold</div>
    </main>
  );
}

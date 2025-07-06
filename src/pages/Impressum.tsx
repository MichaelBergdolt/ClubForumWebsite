import Layout from "@/components/Layout";

const Impressum = () => {
  return (
    <Layout>
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold text-black mb-8">Impressum</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Anbieter dieser Website gemäß § 5 TMG:</h2>
              <p>
                Evangelisches Jugendwerk Bezirk Böblingen<br />
                Sindelfinger Straße 9<br />
                71032 Böblingen
              </p>
              <p>
                Telefon: 07031 / 4921441<br />
                Fax: 07031 / 4925687<br />
                E-Mail: info@ejwbezirkbb.de<br />
                Web: <a href="https://www.ejwbezirkbb.de/" className="text-neon-green hover:underline">https://www.ejwbb.de</a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Vertretungsberechtigt:</h2>
              <p>
                Die Geschäftsführung der Evangelischen Gesamtkirchengemeinde Böblingen.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p>
                Evangelisches Jugendwerk Böblingen<br />
                Gruppe „Club Forum"<br />
                Sindelfinger Straße 9<br />
                71032 Böblingen
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Haftung für Inhalte</h2>
              <p>
                Als Dienstanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen wir diese Inhalte umgehend.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Haftung für Links</h2>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter (z. B. Instagram, Facebook, Google Maps), auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
              <p>
                Zum Zeitpunkt der Verlinkung wurden die Seiten auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren dabei nicht erkennbar. Eine dauerhafte Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
              <p>
                Soweit Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet und als solche gekennzeichnet. Solltest du trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen Hinweis. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Inhalte umgehend.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Datenschutz</h2>
              <p>
                Hinweise zum Datenschutz findest du in unserer Datenschutzerklärung.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Verbraucherstreitbeilegung</h2>
              <p>
                Das Evangelische Jugendwerk Böblingen ist nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Impressum;
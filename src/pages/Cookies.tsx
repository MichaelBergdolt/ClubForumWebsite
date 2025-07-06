import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const Cookies = () => {
  return (
    <Layout>
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold text-black mb-8">Cookie-Richtlinie</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p>
              Unsere Website verwendet Cookies, um die technische Funktionalität sicherzustellen und das Nutzererlebnis zu verbessern. Dabei setzen wir ausschließlich <strong>technisch notwendige Cookies</strong> ein. Diese sind erforderlich, damit unsere Website korrekt angezeigt und genutzt werden kann (z. B. zur Navigation, zum Speichern von Spracheinstellungen oder zum Schutz vor Spam).
            </p>

            <p>
              Wir verwenden <strong>keine Tracking- oder Marketing-Cookies</strong>. Eine personenbezogene Auswertung Ihres Nutzungsverhaltens erfolgt nicht.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Was sind Cookies?</h2>
              <p>
                Cookies sind kleine Textdateien, die von Ihrem Browser auf Ihrem Endgerät gespeichert werden. Sie enthalten Informationen, die z. B. eine Wiedererkennung ermöglichen oder technische Abläufe steuern.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Welche Cookies verwenden wir?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Sitzungscookies:</strong> Diese werden nach Ende Ihres Besuchs automatisch gelöscht.</li>
                <li><strong>Technisch notwendige Cookies:</strong> Diese sorgen dafür, dass z. B. die Navigation oder Sicherheit der Website gewährleistet ist.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Externe Inhalte</h2>
              <p>
                Wenn Sie Inhalte von Drittanbietern (z. B. eingebettete YouTube-Videos, Karten von Google Maps) aufrufen, können von diesen Anbietern ebenfalls Cookies gesetzt werden. Auf diese haben wir keinen Einfluss. Bitte beachten Sie hierzu die Datenschutzerklärungen der jeweiligen Anbieter.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Cookie-Einstellungen</h2>
              <p>
                Da wir keine zustimmungspflichtigen Cookies setzen, ist kein Cookie-Banner erforderlich. Sie können das Setzen von Cookies dennoch jederzeit über die Einstellungen Ihres Browsers einschränken oder verhindern.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Kontakt</h2>
              <p>
                Wenn Sie Fragen zum Einsatz von Cookies auf unserer Website haben, kontaktieren Sie uns bitte über die im <Link to="/impressum" className="text-neon-green hover:underline">Impressum</Link> angegebenen Kontaktdaten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cookies;
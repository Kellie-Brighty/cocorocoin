import { useState, useEffect } from "react";

import aboutImage from "../../../assets/about.jpg";

interface Section {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

const Finder = () => {
  const [selectedSection, setSelectedSection] = useState("about");
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sections: Section[] = [
    {
      id: "about",
      title: "About CocoroCoin",
      icon: "📄",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">About CocoroCoin</h2>
          <img
            src={aboutImage}
            alt="Cocoro"
            className="w-full max-w-2xl rounded-lg shadow-lg mb-6"
          />
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              When Dogecoin was launched in 2013, it quickly soared to new
              heights, becoming the undisputed leader of meme coins. The iconic
              Dogecoin meme featured Kabosu, a female Shiba Inu dog owned by
              Kabosu Mama, capturing the hearts of millions. Now, Atsuko has
              welcomed a new dog into her life, named Cocoro, and with this new
              companion, CocoroCoin has emerged.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4 font-semibold">
              CocoroCoin is the only CocoroCoin and we will be the new DogeCoin
            </p>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Read the official announcement on Kabosu Mama's blog:
              </p>
              <a
                href="https://kabochan.blog.jp/archives/53553858.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                かぼすちゃんとおさんぽ。- Important Announcement: We Have a New
                Family Member!
              </a>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tokenomics",
      title: "Tokenomics",
      icon: "💰",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Tokenomics</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Total Supply:</strong> 1,000,000,000 COCOROCOIN
            </p>
            <h3 className="text-xl font-semibold mt-6">Distribution</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Marketing & CEX: 20%</li>
              <li>Liquidity: 80%</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  return (
    <div className="h-full relative">
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {sections.find((s) => s.id === selectedSection)?.title}
          </h2>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {showSidebar ? "✕" : "☰"}
          </button>
        </div>
      )}

      <div className="h-full flex relative">
        {/* Sidebar */}
        <div
          className={`
            ${isMobile ? "absolute inset-y-0 left-0 z-20" : "relative"}
            ${isMobile && !showSidebar ? "-translate-x-full" : "translate-x-0"}
            w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
            transition-transform duration-300 ease-in-out
          `}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Documents</h2>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`w-full text-left p-2 rounded-lg mb-2 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedSection === section.id
                    ? "bg-blue-50 dark:bg-gray-800"
                    : ""
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {sections.find((s) => s.id === selectedSection)?.content}
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMobile && showSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setShowSidebar(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Finder;

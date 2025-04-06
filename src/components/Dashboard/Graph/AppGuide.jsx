import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

const AppGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-6 text-center">
        <h1 className="text-xl font-semibold mb-4">Welcome to the App Guide</h1>
        <p className="mb-4">
          Watch the video below to get started with our app.
        </p>

        {/* Embedded YouTube Video */}
        <div className="aspect-w-16 aspect-h-9 w-full">
          <iframe
            className="w-full h-[315px]"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="App Guide"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <Button
          type="primary"
          className="mt-4"
          onClick={() => navigate("/admin")}
        >
          Go to Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default AppGuide;

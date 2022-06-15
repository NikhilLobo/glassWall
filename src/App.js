import { Tabs } from "antd";
import UploadImage from "./components/UploadImage";
import Home from "./components/Home";
import "./App.css";
import { useState } from "react";

const { TabPane } = Tabs;
function App() {
  const [uploadNumber, setUploadNumber] = useState(0);
  const [activeTab, setActiveTab] = useState("1");
  const onChange = (key) => {
    setActiveTab(key);
  };
  return (
    <div className="App">
      <Tabs onChange={onChange} activeKey={activeTab} type="card" size="large">
        <TabPane tab="HOME" key="1">
          <Home uploadNumber={uploadNumber} />
        </TabPane>
        <TabPane tab="UPLOAD" key="2">
          <UploadImage
            setUploadNumber={setUploadNumber}
            setActiveTab={setActiveTab}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;

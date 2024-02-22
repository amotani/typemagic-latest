import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from ".";

const Container = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/manage/agents" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Container;

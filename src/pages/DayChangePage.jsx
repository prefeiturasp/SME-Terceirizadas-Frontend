import React from "react";
import { DayChangeEditor } from "../components/DayChange/DayChange";
import Page from "../components/Shareable/Page";

export default props => (
 <Page tipo="Solicitações" titulo="Inversão de dia de cardápio">
   <DayChangeEditor />
 </Page>
);

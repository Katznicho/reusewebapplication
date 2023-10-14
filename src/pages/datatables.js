import React from "react";
import SectionTitle from "../components/section-title";
import Datatable from "../components/datatable";
import countries from "../json/countries.json";
import Widget from "../components/widget";
import { formatNumber } from "../functions/numbers";

const Simple = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Crop",
        accessor: "alpha3Code",
      },
      {
        Header: "Season",
        accessor: "name",
      },
      {
        Header: "Size",
        accessor: "capital",
      },
      {
        Header: "Plant Date",
        accessor: "region",
      },
      {
        Header: "Harvest Date",
        accessor: "population",
        Cell: (props) => <span>{formatNumber(props.value)}</span>,
      },
    ],
    []
  );
  const data = React.useMemo(() => countries, []);
  return <Datatable columns={columns} data={data} />;
};

const Index = () => (
  <>
    <SectionTitle title="Gardens" subtitle="List of Gardens" />
    <Widget
      title="Datatable example"
      description={
        <span>
          Use the <code>&lt;Datatable /&gt;</code> component to create a data
          table
        </span>
      }
    ></Widget>
    <Simple />
  </>
);
export default Index;

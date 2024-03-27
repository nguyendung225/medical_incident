import { FC, SetStateAction, createContext, useContext, useState } from "react";
import { WithChildren } from "../../../_metronic/helpers";
import StatisticalContent from "./StatisticalContent";
import { IStatisticalChart } from "./models/IStatisticalChart";

type StatisticalContextProps = {
  type: number | undefined;
  setType: React.Dispatch<SetStateAction<number | undefined>>;
  year: string | number | undefined;
  setYear: React.Dispatch<SetStateAction<string | number | undefined>>;
  loading: boolean | undefined;
  setLoading: React.Dispatch<SetStateAction<boolean | undefined>>;
}

const initState = {
  type: undefined,
  setType: () => {},
  year: undefined,
  setYear: () => {},
  loading: undefined,
  setLoading: () => {}
}

export const StatisticalContext = createContext<StatisticalContextProps>(initState);
export const useStatisticalContext = () => useContext(StatisticalContext);

const Statistical: FC<WithChildren> = ({ children }) => {
  const [type, setType] = useState<number>();
  const [year, setYear] = useState<string | number | undefined>();
  const [loading, setLoading] = useState<boolean>();

  const value = { type, setType, year, setYear, loading, setLoading };

  return (
    <StatisticalContext.Provider value={value}>
      {/* <StatisticalContent/> */}
    </StatisticalContext.Provider>
  )
}

export default Statistical;
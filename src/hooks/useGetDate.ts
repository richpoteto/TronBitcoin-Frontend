import { useSelector } from "react-redux";
import { IReduxState } from "store/slice/state.interface";

export const useGetDate =  (timeStamp : number) : {rtnTime : number} =>
 {
    const startTime: number = useSelector<IReduxState, number>(
        (state) => state.nft.startTime
    );

    const rtnTime =  (timeStamp - startTime) / 4 / 60;

    return {rtnTime}
}
import axios, { AxiosResponse } from 'axios';
import { IAllowance, IAllowanceByEmployeeResponse } from './models/IAllowance';
import { APIResponse } from '../../models/models';

const API_URL = process.env.REACT_APP_API_URL;
export const getAllowancesByContract = (
    id: string
): Promise<AxiosResponse<IAllowanceByEmployeeResponse>> => {
    let url = `${API_URL}/hop-dong-lao-dong-phu-cap/get-by-hop-dong/${id}`;
    return axios.get(url);
};

export const addNewAllowance = (
    allowance: IAllowance
): Promise<AxiosResponse<IAllowanceByEmployeeResponse>> => {
    let url = `${API_URL}/hop-dong-lao-dong-phu-cap`;
    return axios.post(url, allowance);
};

export const updateAllowance = (
    id: string,
    allowance: IAllowance
): Promise<AxiosResponse<IAllowanceByEmployeeResponse>> => {
    let url = `${API_URL}/hop-dong-lao-dong-phu-cap/${id}`;
    return axios.put(url, allowance);
};

export const deleteAllowance = (
    ids: string[] | string
): Promise<AxiosResponse<IAllowanceByEmployeeResponse>> => {
    let url = `${API_URL}/phu-cap/ids?ids=${ids.toString()}`;
    return axios.delete(url);
};
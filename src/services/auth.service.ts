import { showAPIErrorToast } from "@/utils/toast";
import api from "./api"

export const loginService = async (params: { email: string, password: string }) =>  {
    try {
        const response = await api.post<AuthResponse>(`/signin`, {params});
        return response.data;
    } catch (error) {
        showAPIErrorToast(error)
    }
}

export const registerService = async (params: { email: string, password: string }) =>  {
    try {
        const response = await api.post<AuthResponse>(`/signup`, {params});
        return response.data;
    } catch (error) {
        showAPIErrorToast(error)
    }
}
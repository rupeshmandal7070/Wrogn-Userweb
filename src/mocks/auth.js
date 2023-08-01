import axios from "axios";


class AuthApi{

    async getUser(){
       const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/userapp/user/me`,{
        method: "get",
        headers: { 
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
       if(response.data.status==='SUCCESS')
       return response.data;
       else
        return false;
    } 

    async updateUser(data,id){
      const response = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/userapp/user/update/${id}`,data,{
        method: "put",
        headers: { 
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
        if(response.data.status==='SUCCESS')
        return response.data;
        else
         return false;
    } 

    async deleteUser(id){
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/userapp/user/delete/${id}`,{
        method: "delete",
        headers: { 
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
        if(response.data.status==='SUCCESS')
        return response.data;
        else
         return false;
    } 

 
   async register(data){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/register`,data);
    if(response.data.status==='SUCCESS')
    return response.data;
    else
     return false;
   } 

   async login(data){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/login`,data);
    if(response.data.status==='SUCCESS')
    return response.data;
    else
     return false;
   } 

   

}

export const authApi = new AuthApi();
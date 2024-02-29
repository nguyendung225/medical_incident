export const handleGetAge = (ngaySinh: string) => {
    return new Date().getFullYear() -  new Date(ngaySinh).getFullYear();
}
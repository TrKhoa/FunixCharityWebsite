//Thực hiện tính toán %
export const percent = (raise, goal) => {
    const count = Math.ceil((raise * 100) / goal);
    if (count > 100) return 100;
    else if (count < 0) return 0;
    else return count;
};
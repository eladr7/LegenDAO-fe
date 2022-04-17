const inputingFloat = (e: React.KeyboardEvent<HTMLInputElement>, pre: string) => {
    if (e.ctrlKey && /[aA]/.test(e.key)) return true;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") return true;
    if (e.key === "End" || e.key === "Home") return true;
    if (e.key === "Backspace" || e.key === "Delete") return true;
    if (!/[0-9.]/.test(e.key) || (e.key === "." && pre.includes("."))) return false;
    return true;
};

const validator = {
    inputingFloat,
};

export default validator;

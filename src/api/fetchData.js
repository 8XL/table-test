import axios from 'axios';

export const fetchUsers = async (size) =>{
    const endUrl = `http://www.filltext.com/?rows=${size}&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`;
    const { data } = await axios
        .get(endUrl)
        .catch(err => console.log(err));
        console.log(data)
    return data
};


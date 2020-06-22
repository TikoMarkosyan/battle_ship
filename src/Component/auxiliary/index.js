import React from 'react';
class Auxiliary {
  sentvertical(newarr,arr,index_i,index_j)  {
        for (let i = 0; i < arr.length; i++) {
            newarr[i][+index_j] = arr[i];
        }
        return newarr;
  }
  changeVertical(arr,index_j) {
    const newarr = [];
        for (let j = 0; j < arr.length; j++) {
              newarr[j] = arr[j][+index_j];
        }
    return newarr;
  }
  check(arr,number) {
    return !arr.includes(number);
  }
  checkendgame(arr,value){
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].includes(value)){
                return false
            }
        }
        return true;
  }
  establishShipVertical(array,index_i,index_j,leng,number) {
      const val = +index_i + leng-1;
      let newarr = JSON.parse(JSON.stringify(array));
      const arr = this.changeVertical(newarr,+index_j);
      const arrV = arr.slice(+index_i, val+1);
      if(val < arr.length && this.check(arrV,number)){
          arr.fill(number,index_i,val+1);
          newarr = this.sentvertical(newarr,arr,index_i,index_j);
      }
      return newarr;
  }
  establishShipHorizontal(array,index_i,index_j,leng,number) {
        const val = +index_j + leng-1;
        let newarr = JSON.parse(JSON.stringify(array));
        const arr = newarr[index_i].slice(+index_j, val+1);
        if (val < newarr[index_i].length && this.check(arr,number)) {
          newarr[index_i].fill(number,index_j,val+1);

        }
        return newarr;
  }

}
export default new Auxiliary;

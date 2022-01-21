function randomArr(arr) {
    let i = 0, select = [], last = '';
    while (i < 20) {
        last = Math.floor(Math.random() * arr.length)
        if (select.indexOf(last) === -1) {
            select.push(arr[last]);
            i++
        }
    }
    return select;
}
export default function adjust(arr) {
    let data = randomArr(arr), index = 0, result = {}, model = [], item = '';
    for (let i = 0; i < data.length; i++) {
        model.push(data[i]);
        if ((i + 1) % 4 === 0) {
            item = model[Math.floor(Math.random() * model.length)]
            result[index] = { list: model.slice(), item }
            index++;
            model.splice(0, 4);
        }
    }
    return result;
}

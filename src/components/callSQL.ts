export const callSQL = (input: string) => {
    return new Promise<any>((res, rej) => {
        const db = window.openDatabase("mydb", "1.0", "Test DB", 4 * 1024 * 1024)
        db.transaction(tx => {
            tx.executeSql(input, [], (result, results) => {
                console.log(results);
                return res(Object.values(results.rows))
            })
        }, rej)
    })
}
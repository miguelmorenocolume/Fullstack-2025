const size = 5;

for (let i = 0; i < size; i++) {
    if (i === 0 || i === size - 1) {
        console.log('*'.repeat(size));
    } else {
        console.log('*' + ' '.repeat(size - 2) + '*');
    }
}
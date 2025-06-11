import mongoose from 'mongoose'

const connect = async () => {
    try {
        console.log(`Kết nối database thành công!`);
        await mongoose.connect(process.env.DATABASE_CONNECT);
        
    } catch (error) {
        console.log(`Kết nối database thất bại!`);
        
    }
}

connect()
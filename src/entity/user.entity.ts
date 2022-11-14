import {Entity,Column,PrimaryGeneratedColumn, BeforeInsert} from "typeorm"
import bcrypt from "bcrypt";


@Entity('users')
export default class User {

@PrimaryGeneratedColumn()
id: number;

@Column({unique: true})
username: string;

@Column()
firstName: string;

@Column()
lastName: string;

@Column()
mobile: string;

@Column()
email: string;

@Column({select: false})
password: string;

@BeforeInsert()
async hashPassword(){
   this.password = await bcrypt.hash(this.password,10);
}


}


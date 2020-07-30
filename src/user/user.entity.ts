import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    BeforeInsert,
    OneToOne,
    JoinColumn
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import {CartEntity} from '../cart/cart.entity';
  
  @Entity('users')
  export class UserEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({ type: 'varchar', nullable: false, unique: true }) username: string;
    @Column({ type: 'varchar', nullable: false }) password: string;
    @Column({ type: 'varchar', nullable: false }) email: string;
    @CreateDateColumn() createdOn?: Date;
    @CreateDateColumn() updatedOn?: Date;
    
    @OneToOne(type => CartEntity)
    @JoinColumn({ name: 'id' })
    cart?: CartEntity
  
    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  
import { Entity, Column, PrimaryGeneratedColumn,OneToOne,JoinTable,JoinColumn,ManyToOne,OneToMany } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { ProductEntity } from 'src/product/product.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  // @OneToOne(type => UserEntity)
  // @JoinColumn({ name: 'id' })
  // user: UserEntity

  @ManyToOne(type => ProductEntity,)
  @JoinTable({ name: 'id' })
  products?: ProductEntity[]

  @Column({default : new Date()})
  addedOn: Date;

}
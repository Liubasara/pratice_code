count = 0
i = True
row_data=[]


if __name__=="__main__":
    while i:
        try:
            count +=1
            this_data = {}
            print("请输入武器名称"+str(count))
            name = input()
            print("请输入枪支分类"+str(count))
            cate = input()
            print("请输入阵营。T or Ct or PUB"+str(count))
            camp = input()
            print("请输入描述"+str(count))
            desc = input()
            print("请输入价格"+str(count))
            price = input()
            print("请输入速度"+str(count))
            speed = input()
            print("请输入伤害值"+str(count))
            damage = float(input())
            print("请输入护甲穿透值"+str(count))
            chuan = float(input())
            NoArmor_breast_damage = int(damage)
            Armor_breast_damage = int(NoArmor_breast_damage*chuan)
            NoArmor_head_damage = int(damage*4)
            Armor_head_damage = int(damage*4*chuan)
            NoArmor_belly_damage = int(damage*1.25)
            Armor_belly_damage = int(damage*1.25*chuan)
            leg_damage = int(0.75*damage)
            
            this_data['name'] = name
            this_data['cate'] = cate
            this_data['camp'] = camp
            this_data['desc'] = desc
            this_data['price'] = price
            this_data['NoArmor_breast_damage'] = NoArmor_breast_damage
            this_data['Armor_breast_damage'] = Armor_breast_damage
            this_data['NoArmor_head_damage'] = NoArmor_head_damage
            this_data['Armor_head_damage'] = Armor_head_damage
            this_data['NoArmor_belly_damage'] = NoArmor_belly_damage
            this_data['Armor_belly_damage'] = Armor_belly_damage
            this_data['leg_damage'] = leg_damage
            this_data['speed'] = speed
            
            row_data.append(this_data)
        
        except KeyboardInterrupt:
            i = False
            with open('rowdata.txt', "a", encoding='utf-8') as txt:
                txt.write(str(row_data))

    

   
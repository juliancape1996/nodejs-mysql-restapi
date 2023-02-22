import { pool } from "../db.js";

//listarEmpleados
export const getEmployees = async (req,res) => {
    try {

        const [rows] = await pool.query('SELECT * FROM employee');
        res.json(rows);

    } catch (error) {
        
        return res.status(500).json({
            mesage:' somethin goes wrong'
        });
    }
    
};

//listar un Empleado
export const getEmployee = async (req,res) => {

    try {
        const id= req.params.id
        const [rows] = await pool.query('SELECT * FROM employee where id=?',[id]);

        if (rows.length<=0) {
            return res.status(404).json({
                message: 'employee not found'
            })
        }
        res.json(rows[0])

    } catch (error) {

        return res.status(500).json({
            mesage:' somethin goes wrong'
        });
    }
    
};


//crear empleado
export const createEmployee= async (req,res)=> {
    try {

        const {name,salary} = req.body
        //con el pool se puede realizar consultas
        const [rows] = await pool.query('INSERT INTO employee(name,salary) VALUES(?,?)',[name, salary])
    
        //para que me muestre los datos que se enviaron a la base de datos
        res.send({
            id:rows.insertId,
            name,
            salary   
        })    

    } catch (error) {

        return res.status(500).json({
            mesage:' somethin goes wrong'
        });
    }

};




export const deleteEmployee= async (req,res)=> {

    try {

        const id= req.params.id
        const [result] = await pool.query('DELETE FROM employee where id=?',[id]);
    
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'employee not found'
            })
        }
        res.sendStatus(204)

    } catch (error) {

        return res.status(500).json({
            mesage:' somethin goes wrong'
        });
    }

};

export const updateEmployee= async (req,res)=>{
    try {
        const id= req.params.id// esto es lo mismo que se esta haciendo en la linea de abajo 55
        const {name,salary} = req.body
        //Con el ifnull si el valor no se pasa , dejara por defecto el que tenia anteriormente
        const [result] = await pool.query('UPDATE employee SET name=IFNULL(?, name), salary=IFNULL(?, salary) WHERE id=?',[name,salary,id]);
    
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'employee not found'
            })
        }
    
        const [rows]= await pool.query('SELECT * FROM employee WHERE id = ?',[id])
    
        res.json(rows[0])//con el 0 es para que no devuelva un arreglo

    } catch (error) {

        return res.status(500).json({
            mesage:' somethin goes wrong'
        });
    }

};

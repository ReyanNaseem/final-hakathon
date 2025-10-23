import { Member } from "../models/member.model.js";
// import randomInteger from 'random-int';

const addMember = async(req, res)=>{
    try {
        const { name, age, relation, gender} = req.body;

        if(!name || !age || !relation || !gender){
            return res.status(401).json({
                message: 'Required field is missing'
            })
        }

        const member = await Member.create({
            ...req.body,
            user: req.user,
        });

        return res.status(200).json({
            message: "Member created successfully",
            data: member
        })

        

    } catch (error) {
        return res.status(500).json({
            message: 'An error occur while create an Member',
            error: error.message
        })
    }
}

const getAllMember = async(req, res)=>{
    try {
        const members = await Member.find();

        if(!members){
            return res.status(400).json({
                message: 'Member not found'
            })
        }

        return res.status(200).json({
            message: 'success',
            data: members
        })

    } catch (error) {
        
        return res.status(500).json({
            message: 'An error occur while get all Members',
            error: error.message
        })

    }
}

const deleteMember = async(req, res)=>{
    try {
        const {id} = req.params;
        const member = await Member.findByIdAndDelete(id);

        if(!member){
            return res.status(404).json({
                message: 'Member not found'
            })
        }

        return res.status(200).json({
            message: 'Member deleted success',
        })

    } catch (error) {
        
        return res.status(500).json({
            message: 'An error occur while deleting Member',
            error: error.message
        })

    }
}

const updateMember = async(req, res)=>{
    try {

        const {id} = req.params
        const member = await Member.findByIdAndUpdate(id,req.body,{new: true})

        if(!member){
            return res.status(404).json({
                message: 'Member not found'
            })
        }

        return res.status(200).json({
            message: 'Member updated success',
        })

    } catch (error) {
        
        return res.status(500).json({
            message: 'An error occur while updating Member',
            error: error.message
        })

    }
}

const getMember = async(req, res)=>{
    try {

        const {id} = req.params;
        const member = await Member.findById(id);

        if(!member){
            return res.status(404).json({
                message: 'Member does not exist'
            })
        }

        return res.status(200).json({
            member
        })
        
    } catch (error) {

        return res.status(500).json({
            message: 'An error occur while updating Member',
            error: error.message
        })
        
    }
}

export {
    addMember,
    getAllMember,
    deleteMember,
    updateMember,
    getMember
}
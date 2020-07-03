import React , {useCallback, useRef}from 'react';
import {useHistory} from 'react-router-dom';
import logo from '../../assets/logo.svg';
import {FiArrowLeft, FiMail, FiLock,FiUser} from 'react-icons/fi';
import {Container,Content,Background} from './styles';
import {FormHandles} from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {Form} from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import getValidateErrors from '../../utils/getValidadeErrors';
import api from '../../services/api';

interface signUpFormData {
    name: string;
    email: string;
    password:string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleSubmit = useCallback(async (data:signUpFormData) => {
        try{

            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name:Yup.string().required('Nome é obrigatório'),
                email:Yup.string().required('Email é obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, {
                abortEarly:false,
            });

            await api.post('users', data)

            history.push('/');
        }catch(err){

            if(err instanceof Yup.ValidationError){
                const errors = getValidateErrors(err);

                formRef.current?.setErrors(errors);
            }
        }
        console.log(data);
    },[history]);

    return (
       <Container>
           <Background/>
           <Content>
                <img src={logo} alt="GoBarber"/>
                <Form ref={formRef} onSubmit={handleSubmit}>
                     <h1>Faça seu Cadastro</h1>
                     <Input icon={FiUser} name="name" type="text" placeholder="Nome"/>
                    <Input icon={FiMail} name="email" type="text" placeholder="Email"/>
                    <Input icon={FiLock} name="password" type="password" placeholder="Senha"/>
                    <Button type="submit">Cadastrar</Button>

                </Form>

                <Link to="/">
                <FiArrowLeft/>
                Voltar para Logon</Link>

           </Content>

       </Container>
    );
}

export default SignUp;

import React, {useRef, useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import logo from '../../assets/logo.svg';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import {Container,Content,Background} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import {useAuth} from '../../context/authContext';
import getValidateErrors from '../../utils/getValidadeErrors';
import * as Yup from 'yup';

interface SignInFormData{
    email:string;
    password:string;
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const {signIn} = useAuth();

    const history = useHistory();

    const handleSubmit = useCallback(async (data:SignInFormData) => {
        try{

            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email:Yup.string().required('Email é obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha Obrigatória'),
            });

            await schema.validate(data, {
                abortEarly:false,
            });

            await signIn({email:data.email, password:data.password});

            history.push('/dashboard');
        }catch(err){
            if(err instanceof Yup.ValidationError){
                const errors = getValidateErrors(err);

                formRef.current?.setErrors(errors);
            }


        }
        console.log(data);
    },[signIn, history]);


    return (
       <Container>
           <Content>
                <img src={logo} alt="GoBarber"/>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu Logon</h1>
                    <Input icon={FiMail} name="email" type="email" placeholder="Email"/>
                    <Input icon={FiLock} name="password" type="password" placeholder="Senha"/>
                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <Link to="/signup">
                <FiLogIn/>
                Criar Conta</Link>
           </Content>
           <Background/>
       </Container>
    );
}

export default SignIn;

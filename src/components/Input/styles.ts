import styled , {css} from 'styled-components';

interface ContainerProps{
    isFocused :boolean;
    isFilled:boolean;
}

export const Container = styled.div<ContainerProps>`
         background: #232129;
         border-radius:10px;
         padding:16px;
         width: 100%;
         border:2px solid #232129;
         color: #666360;
         display:flex;
         align-items: center;

        ${props => props.isFocused && css`
             border:2px solid #ff9900;
             color: #ff9900;
        `}

        ${props => props.isFilled && css`
             color: #ff9900;
        `}

        & + div {
            margin-top: 8px;
        }

        input {
            flex:1;
            background: transparent;
            border:0;
            color: #f4ede8;

            &::placeholder {
                color: #666360;
            }
        }

        svg {
            margin-right: 16px;
        }
`;

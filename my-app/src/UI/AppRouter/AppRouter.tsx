import React, {FC} from 'react';

import {Route, Routes} from "react-router-dom";
import CreateAcc from "../../components/CreateAcc/CreateAcc";
import SignIn from "../../components/SignIn/SignIn";

const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path='/createAcc' element={<CreateAcc/>}/>
            <Route path='/signIn' element={<SignIn/>}/>
            <Route path='*' element={<SignIn/>}/>
            <Route path='/' element={<SignIn/>}/>
        </Routes>
    );
};

export default AppRouter;
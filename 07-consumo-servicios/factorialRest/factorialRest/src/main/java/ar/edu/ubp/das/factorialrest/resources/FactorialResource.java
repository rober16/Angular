package ar.edu.ubp.das.factorialrest.resources;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

@RestController
@RequestMapping("/factorial")
public class FactorialResource {

    private BigInteger fact (BigInteger nro) {
        if(nro.equals (BigInteger.ZERO)) {
            return BigInteger.ONE;
        }
        else {
            return nro.multiply(fact (nro.subtract (BigInteger.ONE)));
        }
    }

    @GetMapping(value="/{nro}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public BigInteger[] getFactorial (@PathVariable int nro) {
        BigInteger[] factorial = new BigInteger[nro + 1];
        for(int i = 0, l = nro; i <= l; i++) {
            factorial[i] = this.fact (BigInteger.valueOf (i));
        }
        return factorial;
    }

}


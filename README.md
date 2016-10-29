# AngularJs directive for floating point numbers only
AngularJs directive to allow the input of floating point numbers, with additional features included

1) Only one decimal point can be entered

2) Dynamic precision set by the user on the input with an attribute precision="{n}" 

3) Integer part length can be set with integerLength="{n}"

4) Currency formatting is also possible with using an attribute isCurrency="true" 

Example: &lt;input type="text" decimal integerLength="9" precision="2" isCurrency="true"&gt;

The above example will let user to input like 123456789.12 and currency formatting will make it like 123,456,789.12

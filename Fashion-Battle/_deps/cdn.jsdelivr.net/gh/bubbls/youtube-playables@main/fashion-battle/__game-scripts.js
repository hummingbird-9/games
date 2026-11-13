// Preloader.js
window._createLoadingScreen = window._createLoadingScreen || function () {

    pc.script.createLoadingScreen(function (app) {
        var showSplash = function () {
            // splash wrapper
            var wrapper = document.createElement('div');
            wrapper.id = 'application-splash-wrapper';
            document.body.appendChild(wrapper);

            // splash
            var splash = document.createElement('div');
            splash.id = 'application-splash';
            wrapper.appendChild(splash);
            splash.style.display = 'none';

            var logo = document.createElement('img');
            logo.src = 'data:image/jpeg;base64,/9j/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t////7gAhQWRvYmUAZIAAAAABAwAQAwIDBgAAAAAAAAAAAAAAAP/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8IAEQgA8ADwAwEiAAIRAQMRAf/EAOAAAAEFAQEAAAAAAAAAAAAAAAIAAQMEBQYHAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUGEAABBAMAAgMAAQQBBQEAAAABAAIDBBESBRAGICETBzAxFBUiQEEjMyQWEQACAQIDAwULCAYIAwkAAAABAgMREgAhBDEiEyBBUTJCEGFxUmKCkiMzQwUwgZGxwXKiFKFTY3OTo0DwwuKDwyQ00fHSsvKz0+NElBUGEgABAwEFBAULBQEAAAAAAAABABECISAxQRIiEDBRA2FxMkJigZGhscHhUnKCkqJAUNGy0hP/2gAMAwEBAhEDEQAAALSlHb7AZGNSIWBFCpCtxPI7UalQhNziAc3SjaUQhaVrqF5XbiKR5mJp4whhni22iaRru20hefzwFKFju5KYVM1gOcFZyoyTjM5Uq7yJKNpgZE0qqonkSBclKjjmgu4QlbbaJpBdWZYZeHnMTlnOtISts0guOexsr0GfJDUiKfQN5H2uNSpKJpWbiaVNxKRkwYxbhjmDTSIZgq4glGtJTYuTIpY5JyJOSgSd3PnnU8tuZeZvnzvXvqjeR9tIlKwRkTMjGXMHcbK2CohlC7iGULuIZRekIyp05ifLDmxKCNiM3oaGas8UM+ZcvY0d7IeGw5u+uNSMKNpE3F5d6pxEKPs8jXmwCUOnaMZAq4xlRcbEMtiNshGJEmYGZlzfS8sscfcyIJ5fW8DhtJZ926e+h2dhCJi6Hj+t8/zjrb/nPbjuAY9HXHIAumFxLEXZ2RQlgTPGRBmBOQ4/s/NVy2rbsphuVLodzNmaDDeNAQoW62Bu85ljN0GNqKpQcOrsQOL0FnYsUTJ3q21Ll4vMlrO+zLKzXe5HBZyjD5vuLOePKdFBtoo2K8nRpIo1RIwMN8zRy+ch2qZQ5RYe/ZwQu3FhKNgZPq0yx+YhmZxuyYI6mhTWuRZyeLz6/Qc/o/OtK7SxnXL65VEqcrRsOGtxupjz9dzm949Z7ENG1t2GIi9CQJM0DJ9WmWPyroUBFGgOpJizr5xoLZfR3vmPpvnTfQdBw/dk58WjBU54a3OV18B6RzHXO4eA7rCrom1+T6h6EwNXSTAxUjRsPtRsV+X5BJIEmQoOQ6zmDo5TXRrfu/P+240VXuuK6gXQtPA+MPNfTa4ch2mfpguX6XDennHe+VewX1ZzdVRv0sFtGhXcCTVr6Nnaufx/GxJJpJMEfn3feZHToUdEVv0ePZ5px0r4lZaepzpp4Xgay1XVmvUpMgxi2EDpnBJIKNHcVdd0YrmXPlIhuEkgq8P6EJryWjtovkeZ6aoawYXdZC6O8ky9F+XaijkkhtHWm7FeO01Xe3XqATOx0zgkkC08fWz0q1dPMuEkmkkgSSDz6Ptqx0ZGHu2j1NLSilPFdJEqxXQW6qtTVKzJUmr1evZage9BUwoSaiv0LOWl/P0ILmgkqlJIEkgSSBVLaKEk5KSQJJAkkB2qSRZqz2ZvOsPWl6UFSxS//9oACAECAAEFAA5EprllZWUfAQWUXIHKYsrbCBz4BQyVlHwPGUU0ILKIQOFnKBU0rgYJHuB8BZ8BN+kCh4I8yt2ULcDPknCBBAQKys/LbPkFTbFlUHQIFbLOVsPJTs4aHZ8y4KhP34x41WPB+Uoyq4DSPGUSVn7ByVOSG/qWiVzgW/2x4t/+tkZjm848Ywsp32nRbF7WuQH1hYUsP6OljDiPGER8C36+kUCg4oOCaQnDIZ9tx4ws+T4Ax8Q4hNeWoShBwKyEPifGCEHfIPcED8T5LcrBCDln4BD4j4Fq+wg5Z8BD+lhFq+wg5f/aAAgBAwABBQDKJQctkXLZErKBWVsi5Apqyi7C2yiVsnzNYt0XnOyDlstllNQKBTkXYRdlF2A6R8kkUmRstlstlsgU0oFAolORKJTJC2WN4J2WyzkbAAOBQKBQKDkSiUSn5xLLhrZjvstllO+yxpa4FAoOQK2ySipWucJA0ua1mV/3BUriBA5+QsZQCCLUQiFOQCGiN4JwBkaoBTEtfBIS8BAeMlR3pmlvRjIZNFIpx/x0+3MwNVqtUWhNbggIBALXxnI1TJpQ1lgaiy2RzQHDVapspdPclfEmfYDVhY+EX/J8sYYue1u9waTMvTsUfSYVRfEVch3gpHeuGrVao+ajNpZ4S1U2l5tQuBx5jmlaqvQfA2Lq13KOaOQBO81GOLrLHltGXRWpiTkFFqI+AJBi6NqNEeYJfzfZsfq6nFsJ6+S4YIcsgotRB+BR+EFkxLT92vBD/Acv7otRHgo/2+DHvYSST5BQd4IX/9oACAEBAAEFACxAAINAQajGFoEGgHTBDBgNC0C0Ca1BgWq1Wv0W/WoWoRYgxaDIYAtAnNwiAE8LUIgLVapoQGFrkOYtVrkBq1wtVqgPrC1WEQiPrCIWqDUGnGqLcAtT0QiFhaosWuE0IBFq1wdcHVaoNWqDVqtVqi1Fq1Wq1Wqwg1EZT/pOGUQsIgJoQblFi1wmjKARag3KwAJbbWFmHt1QapZP1Oq1WEWrVaoNWqwinfQd9ohaohEJmEFhFiDUBlarXC7PfgrDn9Dvd23z7UleXVarVarVaotRatVqtVjCwnIhaohEIhAYTSh9qGON7y37AwsKaH9ofYWAdriQ3eVye/M2Wpz5/wDLoarVarVarVarVarCwnBOCLUQiEQi1BAJpQ+1haoBALoGrT904vaxHf6k3486madANWq1Wq1ULhG9+HO1RCIRCIRaiEQiEQiEGgoBBNTUAsIlrW9KN13u+ncCWw7rst8/v64QatVqtVharVdju8/kM5XtnI6dgtRCIRCIRCIRCERctUEAgEAgEAvYLX+Hx43Vr9Gr3LdObjdTkexx0H2eP2NVhYWFhFqIXU5nQ7Pfv2bFeo4IhEIhEIhakkMARQQ+0AgE0ZIQXsZd/r7F0yv9Tpc/rex9evQFO/wJKHOwgFqi1YWFhM9Htcy03hOtVgwNaQiEQiFqsIokJjXOdqWkIIIIL3KV36dAt6PN/jKGg2Av54ge+O11QFhDILjsSEVhM73WdJT6ItA/3KKIRdF+JRKKOE1oa4teSEEEEF0afH6HY6Vh5u0J+xQmb7l7XKPTLwi64QWUUG7EqeZkEPTpdStyIafsENDkVLleuUUUSiUSiiEHIFZBWAggVendXo1qNmeu+s+R3Pk5da7cfRk6N67C+xUtMtVcrKyiUSurqeZNJEKNieJpZJ+kZKJRKJRWV9laEkFByDkHIFAqSOKaKea/Tt2Ln+xqxw0IK1W3I+x+V9lLgPB4uVstllErqDfmw9CNtKBjJRX2Y0lEolEohfQWQtk/lQxwy0p2oH7BQKBQKqUacs3sHr8Mg5rqDDyeZXuUR6vx2x8+FlanstlstkSnhr28uOCnbtOdDYe8OaSiUSiUXLKJRKsQGSuC0Log6v5NZ4k5NhikhnhQcqM35snmLbLgwRTkihG4Ojgd/wCLZbLZbLZFyLsdK1D+9OlJ+nPJRKJRKJWy2Ky5ZWfqxXdIg5uSC05UlWtImUo32OrmoZ3kU7UkUNPl+5VJqXPn/Wrstlstlsun06/OgrOcZS8Acr3H11tYuRciUSshZCyFkfDYEBr2gPjcXNcxNje6T3TpPlf0ej0pKM3Kpz0vWBRHK48etfcLZbLZbL+Sbhkv+gc2SvzXEEWKjqV7j2nWeQXIuRctgtllZWVlZWVlF7XgMmjHRNR9NnS6U3d4XMd1+kTles8ij/rPX4KvM6c8IkTq8Lk6pKpGyRnZdSJ/e9xiZHDEXL3ql/j9j1Gf9OAXIuRci5bLZbuCysokBZWVkqWWSIe09aMc/osZXveoSVv/ANRbY+Ct6/bot5/Q7VGu5kkcjJIdj+bswlwXvnbj4vK/jb16S1BLzr0aLiD7jS/zOH6JaDq5ci5FyJWVlZTmua7C+vhadl3trqsl7s87mGn6vMyT2HrCerzeLFzG1fYoaDaPrlhsvMX0U+Bjl/LDbpt/xhc/TkCfCkZFM33iNnL9d9Ec49qerarrOUSiVlErJVxmHfGVjhJ3GMf1JuZQlqeriGG97PZkj9X5HKpf4/sXrnPHN9Qgo0bDqjsH6cr/ADqHSg4/rXF4jzggxFq90r2L/rRbZ5l/072uLvUpqFKdTevQuU3D6MakjfG4hEKeP9IvjJDu61Yfc6f69TX1Rv59b3C6Y/WOU1prddhZzeVZDOoHSwvbbjka6mHB20Z8kAjp+m+udWfj+o8Hi2fLw2Rs/F5sym9blQIIsx6S/C/cbRo8mgySMUpSvUqUUFz31rX+r8fmn8L/ACJ5qPAqxVbDbDJBJTOGufG5l0OBpxSCRksSBBH9Go/aC5HtH8OpQj6XPi4HU5PUhodWaTlesVOPH7+Zx65ybs8FSbqtK5Vjp2KLJGysjkfGf1gsCWnJGmucwxXinVa0wkhniTXBw+fPf9kAiRhY/wCEkUcgjgiiUozH7zIRy+No2rCYQqcb2weuStl4PiKxJEi2taU1aWJNc5pivOCdBVsqStYiTXtd8qz9Jlej+/kRkfyNfirR8nrUmw/7fnwrj9GS4z1znXeZyPhFce1OrwTiWGSIglpivPanR1bQkpzxrYZ+ET945mfpH873E5t949X46t8mTmSQXa0xquLq/wAWuc0x22uElNjw+N8ZBIMV17V/81pslF7EXFjvFF+Ylbj0l/oEAh/LpOkYwMZ845XxlliKYS0U5rmkEgxXZGpskFhslADxSfrMrce8X/SRWZI0HQWGy0ntRBBUV2Ri/9oACAECAgY/AN69qm/aBIwi39kc5fhI97fOKkJ+NlwXsVtX2Dlwr5k5DZi/v3LBn6VqbyWIgszvXoWkgwH4nw74AoxB7VfKLNURw2MMUAdSFSHAKHVtHzLlue0PS1qirRMU7oOLEXlpjfFQkSdBcNx3F9moV9TsG+oUzKtFQ7qtq/8Abv/aAAgBAwIGPwD9HqLJwhun2FlIyLRgdXD5dKb4aX76UT2ZSkpAUy09+1juiBegYtp0mnbTkHoaxGjh0auD1ezcZYkRJxNEAXJjSWXvdKBD3966wAHc0YLLIHy7BaDjSacPOhkY0zZp4+GKkQxE9WmOnTqQO2JGATSxs5jL/o7vGSB5kTB/rC0TEuh9X27Ilg8ePqQ6mfosO1bkKNaAOCpVECRLNpNaYsgZX9SGUUAqJfF9KfaeUI0j3vWoGIBcm9AjEPbiMSQpai/8qWZsGdZoFnHdOIV4mPGPb2lrgR8upTlKcRzOZInKSxbAKTXx1j6Vyz0Zfs0224AlGRYafTFEhsL0SWuBsZYTlF6MDpqsmQTg7/DL7lqzcs+IZo+eCeE4z+U5rJMepPK4A4ohnq6Zr48bbgsVTmGQ4T1+mWqwCXMcQFpcQFwN/wCKd2ookniiOBbeszqMxMZfAK/l/lSBLkEgnq3zxkYnwlk5x3H/2gAIAQEBBj8A2dzvY2eHGzubPDjZjwY2Y2Y2YGNnPjZjZ/WmBlg5dz9ONmKU242bMeDFPpxSnhxWngx9eK8ih2Ypz83criuPBySOn5GuKcw2Dvn/AJdzv472Pqx3uVQ4+v8AoPg5FObH19zv/VjvfXye/wAjPIDOuKBanorT6cB12EVHdBtC0AFFy2d3ZX5Dv93+uXc7+Psx9uPs7vf5+5XAAaiGtudLqbX+4uOB8K07NCuc09q0Vdly8Z4kuu8v/DwnwrXK0erRN1nFvEp2lyWN/vQXxfK/VyKfox9vc+3Hf/RjwYtkawUO9tz5sZd14qlb1K3DaK41Ebt+YXTsIo1UUBIAJBWrXPxXdLcQQwwTaiSUq802nERRZHIWx45HjmaOJfV/7fchS/ckxHp9XGiSvvQykMCkwDGPgv7p2sfrP7P1eNNqiKGeJJCO+6hz9f8AQMu5n3Mvo5eqmMPFjidZGiOW9JFG0ksf7RHl40d/vcLLCxaFsmVtoPisKm11xKEhY/mUCacsy2NI3q7VA3495o96T+X7zTaQtedPEkZcCgJRQl3KDlQwHMcEgUB5vk+k4y+jufbyS7GiqCWJ2ADGs+IIOFptQqtppJQY+IqRRrLRXF6+yu9bw/Vb+NZq745NKjtA1rVNyb/E3eolrbnEsx8PvST/AOtWSPe2oZWfhtVv2d8Mm98iv5pi00leFBGLpGA2tQlVRP2kjY/KIzQas9WCagLDyGRnTzOv8jnkO5nnjLk6mcI8hoqcOMXO3EdIrUXz8cfUwoXDAAKA0sZVro2PE6s6u/ixphdRFCY73EGsBkRUanqVbh1lTrcP2n/t/wB3FifQFYpJVBWbTpKCjxvlInqXvSzy/wDuL8AmkOo0zGVdNI7XSpZ6+CKS653u0vb/AKy8v4jqTRIotW2mcs28ixi2OyNuy0S3p5eIvhU3wsz6PRnTT6bUQEyCgmjDgTSpD/q5LnSWNP1knufWcvLGeZ5VBz/N3VjQgNJKo3tlAGl/y8WkGMw5zTI5WOZU7OnZaNLw2CcT3kGI4tbHG2i0kLarUq4BWabUEcCOZXu4ixwsv8DC6j4ZDDH8R0Klvh8qxqoRhvfljIF9Vp9Xb+Xm8iTEv/6SfVySfGYn/OahUN8LZWN8Nhh9X6rhSNp4NT/ufeez9R8hJrofihdCzM8DxEtKpO7HJKZ24km97bh+0w+m1U0kcDMpKQsY2JUpL7RT1ew/+XgKNigAVzOXf5OeKDuhVFScgNuCCKEbRytHHcvBjDyzozmMEmyOC6RN6z/ceXiUsjwRRFVOnpSVgWWpZEtZIGRmeLhv6/2mPirahDHPLqUUpaN2NI1eHZetvrpLcCK62MGuwj7MJpoZ1l00LGaSNWDAlPYxyLvWcKWSDUfvEh7oI5sEnn5Gs/OfD7NNc7aXWFqgiN1WNbAPVyNH62LeT+3hXMi2KaXKcyaXOrxm7srf2HwRzjkBQvrAc273I6cBo2KMNmCx3icyRypddqRxZIQNNC9XCx8OrO4kX1aMszv6xsRwRUnUq1kwooksIeSGgDK3DU77xdv2cXtca3XfDX08c5ISWBqusiKFeCRb+D66JWkVfHwX48FlgYjhLwgPWdoXycT1bJIjTfw8S/m5IjqPiiK5CkAq90skcVhd2VfaP+8m95yabPD3Hnc0SNS7HvKLsDS6fUzTajWSoVWZsoXIeaTgvT1cXCjkTyPd4VxNGJhvyRkFXBQBWdiGaFpv9RD7OziJv44munM2pmVS603UoPZI2TSW3e0f5PPGXdnnRSzxxsyKvWLAbirXysXajWsqc0NqhCAaE6qaFIp5EZtxuA8afq5ON6vETjTNH8O0xNGBIQ1HDmMUaFPy8NvrJIrOHxOLJ178amKMQhyIiqhQxyXhtSweMu9iWZdPIWBibIGNS1ps4kUnDvtaNGXEJ4biRSGVygaxllhaJ24V9u/2sRalOrMgcDoqK083laoP1eC//ZOINRY0i33WpRjkpVesdztdvHDVHdmzc8NwLnXUTWdXfVPy2kgj/wAHCyUpeoam2lRWnyHRy3hlAeOVSkikZFWFrL6OG0fxLUIkELtTSuLTOUZ0SV5ku3nX/b+6s9jFFgSQgfloiplWuQUGx+r4ni4ljMvrtMMl0xZCIzvrbHpjxeqtl7ye74uEWGBlEUb3TuCC9tA3rGu4u9C/E/Vez/WYkMqia6aNbQFYdaIubbdO/tXl6vExoyoIHCUUNaim72t7m5WrXbWGTLzWwGZXKI2/bHVUDeNL2cRyi+QOqs7OaAFWFa+Y3UxwyKBQCMiu3aLW5XT3UffLsBVblFK9bO09XAkijeSF1DKwoxoRXqpvfhxQ7RtHJk1bwRtI68FnZFLMoPUckbyeTgyaURjSJENPJCF3Igpe22FSkdvrLf2eFgbUcZzDY8cJooMJsb2G8nt29pLjQjVwtHpmaaJoGFt3EPHD3Kd5LuJiyFHhF3ErG5FWrfvbVfe8fEUEdbUBoTSpqSzE2hV63KZHAZWBDKcwQciDjV6dVpEzCgOzMDc/HhJUJ4TPmOySAGV1+8jdrCuNjCvyLxRNYxUhK1oDSm6V34/MwFI4fiqaUp5DdTEqyWXMAIlZCZGNN1YWr1uJ/wCpgEXRNTO01FfOuxWNlkHR1T+nd/Hj1iMg6SMvT6vcMZzZnNnn3yKD6DYg1MQ3ZCaqdhDe1ienlxYLUFQDQ0xFLtMZSX9O9+F8BhsIwp6RX6c+XPQArQE+G1efBiIAYC5aczdb7bMQv0bp+Q29yhzB2g7MRcJqcKVZOG5yy22N2duLWrG47L/9eKEUPc3oxU843T9K0xbE1gVlcXZs3BJWS23qpdJZe3bxHp5VCni3ROOcNQdbLxPTwzLtK0B8O7iUyAmJIzcBTqgU7VMKtUR0Zot4sa2Hh35InWwrXBqErVdm7u83KWWZ1UyyLFEGNoLv1RX5rsG7elmzLHLLnxXmGHifWWkkMtY5Qvp8KxfkNnItYXL0Hm+6ezikLXrzxP8AZ/dxQnhNzhtnpdZfOxvCldh5j52BwqfmNLfRSaXB2Dp5jxNKvkS40/w8aZ31FknHEe/ww6twPZB7nfgs/wCy957WHiCaPTHTFJFcvMeHbxI0S5ruH73T9TDQMpAeLhkoaVBW3qtcv4cKJU04cl2KMUMlGbn4h4jS/dl/h+yxKIYyIxKzbpvAuz66NKq713vf/L5Wk0QJthiMrLzXSGxcvuRfjwfiE5Yvqt3ToxNEhU9hW6nHkW/93HBgg7DkfBjU6CStYXaPPnANEbzk3saKduvJBGzfetF/4vlaSi7oYZMPnwWhbiR86/8AVHiWaReE8KM4cbBQXN5SYed4ZGi1EhMdhCusZHqk4bB+omIfh7RNHppAJp3cx3yRQyPI6sqLe/E4kUXtOpqMdAOIZGDM4W8PcRXtjdw8Ubso162qrNUXxB5Vs/wWm9DFzANlsKgk+fuv+LGV0Z728PRbe/m43GV+9W0/zLV9F8UkRkrsuBFfBXuTaaNjbJNwbvFjhFk7r93hysmEhiUJFGoREGwKotVR5vch1yiiaxKMf2kdEb0omhxApNWieSMjoActH/LdeVt5Gfc2Y/qcBkqD42E0kqhZtfJweIDQWANLPep8ZE4P+NiCce8IKyXUFVI73ZXCQiSlun1SErmARJBZd2fdy4lmyaNI2a9dmSltmIIjKhlZFUAZkkgLjSarTzorxamOuwVXO9N8dtd3CyxMHjkAZHGYKsLkZT5S4qhAJ6wOw4I7Q7JyOPVtWvWjOQP9lsJJptOq67VOYomO7w6KXefhr6uazdtVsav408gErOdNFxLjWlk2okZxd7R2jX2fu3wTwi46Y9/8K+s9JMFTkRtB24ldRWTSEahfAtRL/JaTGq03OGWYeevCb0eAvyBUnMZGnKC9A+vGm0+ooSIWaNTkas1rHrRLaqxfrcLK4G4wYKZ0IoTY3vF/Z+9x8OXRqFhkYmcp7NboJ8qlm4snGlvdt/2nX/Va0moX8vLUjNTuNiMkQVVcuG6F/wDCrqpN7xMRyHTwELKpPDeNdgdqrwtem5u+JhYQFU6Nm05jU3WhKNDHcHmusgeJPadzPFV3W6Rj4a8o/wBMscqIwr7QsjS3Hq70XBs+5JjUaKM0l0k3EKcxSYVR/wCLFOuKSKUPTzYpKqyrzXAN9F2NTrtElkwKR5m5QJWETPY93Vv3MJpUO9qI3ijUmgLALOBVt3qwPis0TxjxiN3+ItY/xcsONjZHwjlZkbxyOJkdQ5iVEBoD2eLz/v8AEqrAt0iHaDQHwN5WPhcalV33VAMg2cuShgvVXHxVa7raSZQOi5THu+lhZQrXJmDccEgPRWXIN3ivP5WNboyDbqG44qSSCDZcO1vI8f8ADxdCwlXoOR9Lq4tYFW8U5Hufl/iGnj1UNbgkqhgGoVvXxHtbrJiV/hmnMDTKFkJkkkqqksq+vkkt62KHMdGKxG09HNjWaKONmnkMJVUFxIWeF3tXterV8SQMxi1WjlZDJGTVZImtvjb7y3JiyQ2fEtOq/moxkHHVGph/Zye8T3Eu57PgySkywIWO1lFjenHY2KwTNH5LgOPSXhsv8zG6gmHTE1fwPw5PwYskUxt4rAqfRbulefaPCOUGBxrdXpNQVHHZGQ0eMGMnTqOHbxIFth8vie7wAvBjFAWZrjmetYFDbnm40LTyGbUvLIqGlAqhGl9UnYTdb1vb4v77iawjJ24SV+/LEjfhxXxlrke9iR4+stpFd6m8K5NXHwxVIu1dsSjpU6VtSw/+RjKqMNoxZqEBHTSv6MX6aQEeK2Y9LrYtlUoe/sPgbkUIqOg4/MazRq052yozRsf3jQPFxer72/B1fw/TtHqChj4jSSPusQWWySR07K8iyQB0PZcBh6LVwSIzCx7UTU/lvxI/wYJ086OOZZAUNPvLxUb+XgEbDg02NmOTqNa/V00TynzFLUxxOJwtUpJM8RNTdm7N1eu3XxlrHQjrEAAk+NiGlTIzyu7sbmY2yLvPXrY1MbGl7xAUpWvEVqb7IvZ8bEMi6m2gUhWjkFfCY1kXs41IXXIpdGa08a4HN1VlRD1WW3HwnVmZpZoJoUVipjVa6j8pbdM8csjvppH3EXh/51moW4eMNoxfCeIvRz4qpKsNuLJ1DA7SB9a4v0z2+TtX6Ozj1q0HjjNcVGY+SXpXdPzYuG1Pq5M2hkZkSdbWZCAwzDZXB17PaTDwGMaqF47o5UKIDQ034pWWx0/Z8fr4CQwxIWzbiSHdAoLqRRvfjjl21OsNQ2ofIKGzdNPCN2GNm/eTfrJnw40/tDNHTZsqfH3cQtPpFYWgVUvDstGf5dlTs+JjhtBJJcoa46iUE3b9KRt4rWYmOghXTmJ5qyKSWJSNTDfLqOLI1sl+5hZk6sih1p0ML1+vFUNOnoxbMLX5mH/HFV317236MXKSD0jFsoqPGH2ri+BrG6V2ecmN9bl8dM/pXFQaj5B06d4fVgg7DkcFDzHkgSIHoai4A0PeweGoUnaf+eGHer9GIo628SSt3RaP72IlOa2jOmWDsyagoNlMasEAXSORmDQMMxu9V7VuxoGQkqsCRi7M+rHB3v4fdoDVfFP2Yy3JP0/3sVIuXxh9uKqSD0jFJRcPGG3F6ZN4y5HzhioHFXpXJvRxQHMbRz8pDzE0Pz5dwSDnyPLI6caOCS7fLPuiuWS730YiVmZTaKllP4sANLmxuFFJyOzYMalNBp3nEk1eKw4cYBuS5pH3bV7WIdHrpI5Z463GEMEFTdYvE3mt8fk0k3l6efF8RtPe2ecuN8ZczDZiqmhHOMUkFw6RtxXIt0jJhisZ4q9BybFrVVhtVsjyVfpFcMvTs8PyAfV6aDUsuSmaJJCATW1WdWtXFBotOgGyxbP/AArMKyQrLCuSy0BYIOqjfdxw1a1/1bbrej2vNxGW227fBlyqqaHpGLZht5+b5xi6E0rzbQcUcUOKg0I2EYpILx07DihAfvHaP7WKwtcPEf7GxbIpjboOz5j3Svin9B7hI2Nn8jQiowJeGFcbGXLbtwqLsUAD5vkKqcucc2LJAATzHZisR80/YcWsCD0HFRkRsOKPvjp58W5N0q236MVga3yGzXuW8zinzjPuVG1c/m5/6LTrL0H7MUOZ6DtGKx7w6OfFDkRtGK8+KPvr39v04//Z';
            splash.appendChild(logo);
            logo.onload = function () {
                splash.style.display = 'block';
            };

            var container = document.createElement('div');
            container.id = 'progress-bar-container';
            splash.appendChild(container);

            var bar = document.createElement('div');
            bar.id = 'progress-bar';
            container.appendChild(bar);

            const loaderOverlay = document.createElement('div');
            loaderOverlay.id = 'preloader';
            loaderOverlay.classList.add('preloader-hidden');
            document.body.appendChild(loaderOverlay);

            const loaderAnimationContainer = document.createElement('div');
            loaderAnimationContainer.id = 'preloaderAnimation';
            loaderOverlay.appendChild(loaderAnimationContainer);

            const loadingImage = document.createElement('img');
            loadingImage.id = 'walking-model';
            loaderAnimationContainer.appendChild(loadingImage);

            const loadingTextDiv = document.createElement('div');
            loadingTextDiv.id = 'loading-text';
            loaderAnimationContainer.appendChild(loadingTextDiv);
        };


        /* loading progress */
        let loadingProgress = 0;
        let realProgress = 0;
        let simulatedProgress = 0;
        const realProgressRange = 0.6;
        const simulatedProgressRange = 1 - realProgressRange;
        let simulationStep = 0;
        let simulationTotalSteps = 0;
        let simulationInterval = null;

        const sineOut = (k) => {
            if (k === 0) return 0;
            if (k === 1) return 1;
            return Math.sin(k * Math.PI / 2);
        }

        const updateProgressSimulation = () => {
            simulationStep += 1;
            simulatedProgress = sineOut(pc.math.clamp(simulationStep / simulationTotalSteps, 0, 1));
            updateProgress();
        }

        const finishProgressSimulation = () => {
            appReadyToStart = true;
            clearInterval(simulationInterval);
            simulatedProgress = 1;
            updateProgress();
        }

        const startProgressSimulation = (simulationTime = 10.0) => {
            const tickDuration = 0.05;
            simulationStep = 0;
            simulationTotalSteps = Math.ceil(simulationTime / tickDuration);
            simulationInterval = setInterval(updateProgressSimulation, tickDuration * 1000);
        };

        var hideSplash = function () {
            pc.app.fire(EventTypes.HIDE_TRANSITION_SCREEN, 0.5, () => {
            });

            LoadingOverlay.transition(
                { color: '#fcb6dd', transitionDuration: 0.0, displayLoadingAnimation: false },
                { color: '#fcb6dd', transitionDuration: 0.5 },
                () => {
                    var splash = document.getElementById('application-splash-wrapper');
                    splash.parentElement.removeChild(splash);

                    const inputBlocker = pc.app.root.findByName('InputBlocker');
                    if (inputBlocker) inputBlocker.enabled = false;

                    APIMediator.sendPreloadProgress(100);
                    APIMediator.initCallbacks();
                    APIMediator.reportGameReady();
                }
            );
        };

        const updateProgress = () => {
            loadingProgress = realProgress * realProgressRange + simulatedProgress * simulatedProgressRange;
            setProgress(loadingProgress);
        }

        var setProgress = function (value) {
            APIMediator.sendPreloadProgress(value * 100);
            var bar = document.getElementById('progress-bar');
            if (bar) {
                value = Math.min(1, Math.max(0, value));
                bar.style.width = value * 100 + '%';
            }
        };

        var createCss = function () {
            var css = [
                'body {',
                '    background-color: #ffcedb;',
                '}',
                '',
                '#application-splash-wrapper {',
                '    position: absolute;',
                '    top: 0;',
                '    left: 0;',
                '    height: 100%;',
                '    width: 100%;',
                '    background: radial-gradient(#ffe4f3, #f585c4);',
                '}',
                '',
                '#application-splash {',
                '    position: absolute;',
                '    top: calc(50% - 150px);',
                '    width: 264px;',
                '    left: calc(50% - 132px);',
                '}',
                '',
                '#application-splash img {',
                '    width: 100%;',
                '    border-radius: 24px;',
                '}',
                '',
                '#progress-bar-container {',
                '    margin: 20px auto 0 auto;',
                '    height: 12px;',
                '    width: 100%;',
                '    background: #ffffff;',
                '    border: 1px solid #cc3a8e;',
                '    border-radius: 12px;',
                '}',
                '',
                '#progress-bar {',
                '    width: 0%;',
                '    height: 100%;',
                '    background-color: #ff85cb;',
                '    border-radius: 12px;',
                '}',
                `
            :root {
                --preloader-transition-duration: 0.2s;
            }

            #preloader {
                display: block;
                position: absolute;
                background: #000000;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                margin: 0;
                z-index: 9999;
                transition: visibility var(--preloader-transition-duration), opacity var(--preloader-transition-duration) linear;
            }

            .preloader-hidden {
                opacity: 0;
                visibility: hidden;
            }

            .preloader-visible {
                opacity: 1;
                visibility: visible;
            }

            #preloaderAnimation {
                display: block;
                position: absolute;
                top: calc(50% - 48px);
                left: 50%;
                z-index: 9999;
            }

            #loading-text {
                font-family: 'system-ui';
                font-size: 28px;
                text-align: center;
                font-weight: lighter;
                color: #ffffff;
                width: 240px;
                margin-left: -120px;
                margin-top: 10px;
            }

            #walking-model {
                background: transparent;
                background-size: cover;
                width: 256px;
                height: 256px;
                margin-left: -128px;
                margin-top: -128px;
            }

            @media (max-width: 480px) or (max-height: 480px) {

                #application-splash {
                    width: 170px;
                    left: calc(50% - 85px);
                    top: calc(50% - 120px);
                }

                #preloaderAnimation {
                    top: calc(50% - 32px);
                }

                #loading-text {
                    font-size: 21px;
                    width: 180px;
                    margin-left: -90px;
                    margin-top: 5px;
                }


                #walking-model {
                    width: 192px;
                    height: 192px;
                    margin-left: -98px;
                    margin-top: -98px;
                }
            }

           `
            ].join('\n');

            var style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            document.head.appendChild(style);
        };

        createCss();
        showSplash();

        startProgressSimulation(12);

        app.on('preload:start', function () {

        });
        app.on('preload:end', function () {
            app.off('preload:progress');
        });
        app.on('preload:progress', (progress) => {
            realProgress = progress;
            updateProgress();
        });
        app.on('start', () => {

            /* lock input to prevent clicking through the loading screen */
            const inputBlocker = app.root.findByName('InputBlocker');
            if (inputBlocker) {
                inputBlocker.enabled = true;
                inputBlocker.element.useInput = true;
            }

            /* block screen to prevent acidental clicks */
            pc.app.fire(EventTypes.SHOW_TRANSITION_SCREEN, 0);

            /* wait until all the scene assets loaded, then remove the loading screen */
            EventTypes.afterAll(EventTypes.LOCATION_CHANGED, EventTypes.LEVEL_CLOTHES_READY).then(() => {
                AssetsLoader.getInstance().loadPendingAssets().then(() => {
                    finishProgressSimulation();
                    hideSplash();
                });
            })
        });
    });
};

if (APIMediator.isPlaycanvasEnvironment() && typeof GameInterface !== 'undefined') {
    window.GameInterface.init([], {
        "features": {
            "rewarded": true,
            "audio": true,
            "tutorial": false,
            "copyright": true,
            "credits": true,
            "privacy": true,
            "score": true,
            "progress": true,
            "visibilitychange": true
        }
    }).then(() => {
        window._createLoadingScreen();
    });
} else {
    console.warn('GameInterface is not loaded!');
    window._createLoadingScreen();
}


// soundController.js
/* jshint esversion: 6 */
var SoundController = pc.createScript('soundController');

SoundController.attributes.add('preloadSoundAssets', {
    title: "Preload sounds",
    type: 'boolean',
    default: false
});

SoundController.attributes.add('preloadMusicAssets', {
    title: "Preload music",
    type: 'boolean',
    default: false
});

SoundController.attributes.add('autoPlayMelodyKey', {
    title: "Auto play melody key",
    type: 'string',
    default: ''
});


SoundController.attributes.add('musicAssets', {
    title: "Music assets",
    type: 'json',
    schema: [{
        name: 'key',
        type: 'string',
        default: ''
    },
    {
        name: 'asset',
        type: 'asset',
        assetType: 'audio'
    },
    {
        name: 'overlap',
        type: 'boolean',
        default: false
    },
    {
        name: 'volume',
        type: 'number',
        default: 1.0
    },
    {
        name: 'loop',
        type: 'boolean',
        default: true
    }],
    array: true
});


SoundController.attributes.add('soundAssets', {
    title: "Sound assets",
    type: 'json',
    schema: [{
        name: 'key',
        type: 'string',
        default: ''
    },
    {
        name: 'asset',
        type: 'asset',
        assetType: 'audio'
    },
    {
        name: 'overlap',
        type: 'boolean',
        default: false
    },
    {
        name: 'volume',
        type: 'number',
        default: 1.0
    },
    {
        name: 'autoPlay',
        type: 'boolean',
        default: false
    },
    {
        name: 'loop',
        type: 'boolean',
        default: false
    }],
    array: true
});


SoundController.attributes.add('soundSeries', {
    title: "Sound series",
    type: 'json',
    schema: [{
        name: 'key',
        type: 'string',
        default: ''
    },
    {
        name: 'startPitch',
        type: 'number',
        default: 1.0
    },
    {
        name: 'endPitch',
        type: 'number',
        default: 1.5
    },
    {
        name: 'steps',
        type: 'number',
        default: 10,
        min: 2,
        max: 25
    }, {
        name: 'timeout',
        type: 'number',
        default: 1000
    }],
    array: true
});

SoundController.sfxStateLoaded = false;
SoundController._prevSFXVolume = 1;
SoundController.sfxVolume = 1;
SoundController.musicStateLoaded = false;
SoundController._prevMusicVolume = 1;
SoundController.musicVolume = 1;

Object.defineProperty(SoundController, "musicEnabled", {
    get() {
        return SoundController.musicVolume > 0;
    },
    set(value) {
        if (!value) {
            SoundController._prevMusicVolume = SoundController.musicVolume;
            SoundController.musicVolume = 0;
        } else {
            SoundController.musicVolume = SoundController._prevMusicVolume;
        }
        pc.AppBase.getApplication().fire(EventTypes.SET_MUSIC_VOLUME, SoundController.musicVolume);
    }
});


Object.defineProperty(SoundController, "sfxEnabled", {
    get() {
        return SoundController.sfxVolume > 0;
    },
    set(value) {
        if (!value) {
            SoundController._prevSFXVolume = SoundController.sfxVolume;
            SoundController.sfxVolume = 0;
        } else {
            SoundController.sfxVolume = SoundController._prevSFXVolume;
        }
        pc.AppBase.getApplication().fire(EventTypes.SET_SFX_VOLUME, SoundController.sfxVolume);
    }
});

SoundController.masterVolume = 1.0;
SoundController.apiVolumeMultiplier = 0.0;

SoundController.prototype.initialize = function () {

    /* music assets */
    this.musicSlotKeys = new Set();
    this.sfxSlotKeys = new Set();


    /* events handlung */
    this.app.on(EventTypes.PLAY_SFX, this.playSfx, this);
    this.app.on(EventTypes.PLAY_EXTERNAL_SFX, this.playExternalSfx, this);
    this.app.on(EventTypes.STOP_SFX, this.stopSfx, this);

    this.app.on(EventTypes.PLAY_MUSIC, this.playMusic, this);
    this.app.on(EventTypes.STOP_MUSIC, this.stopMusic, this);

    this.app.on(EventTypes.MUTE_SOUND, this.muteSound, this);
    this.app.on(EventTypes.UNMUTE_SOUND, this.unmuteSound, this);
    this.app.on(EventTypes.ENABLE_SFX, this.enableSfx, this);
    this.app.on(EventTypes.DISABLE_SFX, this.disableSfx, this);
    this.app.on(EventTypes.ENABLE_MUSIC, this.enableMusic, this);
    this.app.on(EventTypes.DISABLE_MUSIC, this.disableMusic, this);
    this.app.on(EventTypes.CHOKE_MUSIC, this.chokeMusic, this);
    this.app.on(EventTypes.UNCHOKE_MUSIC, this.unchokeMusic, this);
    this.app.on(EventTypes.SET_MUSIC_VOLUME, this.setMusicVolume, this);
    this.app.on(EventTypes.SET_SFX_VOLUME, this.setSFXVolume, this);
    this.app.on('postinitialize', this.onAppLoaded, this);
    this.app.on(EventTypes.SET_MASTER_VOLUME, this.setMasterVolume, this);
    this.app.on(EventTypes.SAVEDATA_LOADED, this.loadSavedValues, this);


    /* fetch and apply master volume */
    this.setMasterVolume(1);

    // SoundController.sfxStateLoaded = true;
    // this.setSFXVolume(1);

    // SoundController.musicStateLoaded = true;
    // this.setMusicVolume(1);

    /* init sound series params */
    this.soundSeriesMap = new Map();
    this.soundSeries.forEach(soundConfig => {
        const keys = soundConfig.key.split(',');
        keys.forEach(key => this.soundSeriesMap.set(key, soundConfig));
    });

    /** ios suspended context fix */
    this._applyIOSAudioContextFix();

      
    /* API Events */
    APIMediator.onAudioStateChange((isMuted) => {
        SoundController.externalMuteStatus = isMuted;
        this.setVolumeMultiplier(SoundController.externalMuteStatus ? 0 : 1);
    });
};


SoundController.prototype._applyIOSAudioContextFix = function () {
    if (pc.platform.ios) {
        this.app.touch.on(pc.EVENT_TOUCHEND, () => {
            if (this.app.soundManager.context.state === 'interrupted' || this.app.soundManager.context.state === 'suspended') {
                this.app.soundManager.context.resume().then(() => {
                    console.log('[iOS audio] Audio context restored')
                }).catch(e => {
                    console.log('[iOS audio] Can not resume audio context')
                });
            }
        });
    }
}


SoundController.prototype.loadSavedValues = function () {
    const savedSFXVolume = LocalStorageController.getSavedValue(Constants.Storage.SFX_VOLUME);
    if (savedSFXVolume != undefined) {
        this.setSFXVolume(savedSFXVolume);
    } else {
        this.setSFXVolume(1);
    }
    SoundController.sfxStateLoaded = true;

    const savedMusicVolume = LocalStorageController.getSavedValue(Constants.Storage.MUSIC_VOLUME);
    if (savedMusicVolume != undefined) {
        this.setMusicVolume(savedMusicVolume);
    } else {
        this.setMusicVolume(1);
    }

    SoundController.musicStateLoaded = true;

    /* override with external mute values */
    SoundController.externalMuteStatus = APIMediator.isMuted();
    this.setVolumeMultiplier(SoundController.externalMuteStatus ? 0 : 1);
};

SoundController.prototype.update = function (dt) {

};

SoundController.prototype.playSfx = function (key, debounceDelay) {
    if (Array.isArray(key)) key = Utils.getRandomItem(key);

    const currentTimestamp = new Date().getTime();
    const soundSlot = this.entity.sound.slot(key);
    if (!soundSlot) return console.warn('wrong sound slot ', soundSlot);
    const lastTimestamp = soundSlot.lastTimeStamp;

    if (debounceDelay) {
        const lastTimestamp = soundSlot.lastTimeStamp;
        if (lastTimestamp && currentTimestamp - lastTimestamp < debounceDelay) {
            return;
        }
    }

    if (this.soundSeriesMap.has(key)) {
        const seriesConfig = this.soundSeriesMap.get(key);
        const seriesIndex = seriesConfig._lastSeriesIndex || 0;
        const lastSeriesTimestamp = seriesConfig.lastTimeStamp || 0;
        if (currentTimestamp - lastSeriesTimestamp <= seriesConfig.timeout) {
            soundSlot.pitch = pc.math.clamp(seriesConfig.startPitch + seriesIndex * (seriesConfig.endPitch - seriesConfig.startPitch) / (seriesConfig.steps - 1), seriesConfig.startPitch, seriesConfig.endPitch);
            seriesConfig._lastSeriesIndex += 1;
        } else {
            soundSlot.pitch = seriesConfig.startPitch;
            seriesConfig._lastSeriesIndex = 0;
        }
        seriesConfig.lastTimeStamp = currentTimestamp;
    }

    /* remember current timestamp */
    soundSlot.lastTimeStamp = currentTimestamp;

    if (soundSlot) {
        this._loadAndPlayAsset(key);
    } else {
        console.warn("No sound with key '" + key + "' in storage!");
    }
};


SoundController.prototype.playExternalSfx = function (key, targetEntity, debounceDelay) {
    if (!targetEntity || !targetEntity.sound || !targetEntity.sound.slot(key)) {
        return;
    }

    if (SoundController.sfxEnabled) {
        targetEntity.sound.play(key);
    }
};

SoundController.prototype.stopSfx = function (key) {
    this.entity.sound.stop(key);
};

SoundController.prototype.playMusic = function (key, stopOthers = true) {
    this.currentMusicKey = key;
    if (stopOthers) {
        this.musicAssets.forEach(asset => {
            const slot = this.entity.sound.slot(asset.key);
            if (slot && slot.isPlaying) {
                slot.stop();
            }
        });
    }
    this._loadAndPlayAsset(key);
};

SoundController.prototype.stopMusic = function (key) {
    if (key) {
        this.entity.sound.stop(key);
    } else {
        this.musicAssets.forEach(asset => {
            const slot = this.entity.sound.slot(asset.key);
            if (slot && slot.isPlaying) {
                slot.stop();
            }
        });
    }
};


SoundController.prototype.muteSound = function (key) {
    this.entity.sound.slot(key)._initialVolume = 0;
    this.entity.sound.slot(key).volume = 0;
};

SoundController.prototype.unmuteSound = function (key, volume) {
    this.entity.sound.slot(key)._initialVolume = volume * SoundController.sfxVolume;
    this.entity.sound.slot(key).volume = volume * SoundController.sfxVolume;
};

SoundController.prototype.enableSfx = function (saveApp = true) {
    SoundController.sfxEnabled = true;
};

SoundController.prototype.disableSfx = function (saveApp = true) {
    SoundController.sfxEnabled = false;
};



SoundController.prototype.enableMusic = function (saveApp = true) {
    SoundController.musicEnabled = true;
    if (this.currentMusicKey) {
        this.app.fire(EventTypes.PLAY_MUSIC, this.currentMusicKey);
    }
};

SoundController.prototype.disableMusic = function (saveApp = true) {
    SoundController.musicEnabled = false;
};

SoundController.prototype.chokeMusic = function () {
    this.musicSlotKeys.forEach(key => {
        const slot = this.entity.sound.slot(key);
        if (slot) slot.volume = slot._initialVolume * SoundController.musicVolume * 0.2;
    });
};

SoundController.prototype.unchokeMusic = function () {
    this.musicSlotKeys.forEach(key => {
        const slot = this.entity.sound.slot(key);
        if (slot) slot.volume = slot._initialVolume * SoundController.musicVolume * 1.0;
    });
};


SoundController.prototype.fireSoundStateChangedEvent = function () {
    this.app.fire(EventTypes.SOUND_STATE_CHANGED, SoundController.sfxEnabled, SoundController.sfxVolume);
};

SoundController.prototype.fireMusicStateChangedEvent = function () {
    this.app.fire(EventTypes.MUSIC_STATE_CHANGED, SoundController.musicEnabled, SoundController.musicVolume);
};

SoundController.prototype.setMusicVolume = function (volume) {
    SoundController.musicVolume = volume;
    this.musicSlotKeys.forEach(key => {
        const slot = this.entity.sound.slot(key);
        if (slot) slot.volume = slot._initialVolume * SoundController.musicVolume;
    });
    this.fireMusicStateChangedEvent();
};

SoundController.prototype.setSFXVolume = function (volume) {
    SoundController.sfxVolume = volume;
    this.sfxSlotKeys.forEach(key => {
        const slot = this.entity.sound.slot(key);
        if (slot) slot.volume = slot._initialVolume * SoundController.sfxVolume;
    });
    this.fireSoundStateChangedEvent();
};



SoundController.prototype.onAppLoaded = function () {
    this.createSoundsSlots();
    this.createMusicSlots();
    // if (this.currentMusicKey) {
    //     this.playMusic(this.currentMusicKey);
    // }
};

SoundController.prototype.createSoundsSlots = function () {
    if (this.preloadSoundAssets) Debug.log('Preloading ' + this.soundAssets.length + ' sfx...');

    this.soundAssets.forEach(asset => {
        const slot = this.entity.sound.addSlot(asset.key, asset);
        slot._initialVolume = slot.volume;
        this.sfxSlotKeys.add(asset.key);
        if (this.preloadSoundAssets) {
            if (this.entity.sound.slot(asset.key) && !this.entity.sound.slot(asset.key).isLoaded) {
                this.entity.sound.slot(asset.key).load();
            }
        }
    });

    this.setSFXVolume(SoundController.sfxVolume);
};

SoundController.prototype.createMusicSlots = function () {
    if (this.preloadMusicAssets) Debug.log('Preloading ' + this.musicAssets.length + ' melodies...');

    const playMusicTask = (key) => {
        if (this.autoPlayMelodyKey === key || this.currentMusicKey === key) {
            this.entity.sound.slot(key).play();
        }
    };
    this.musicAssets.forEach(asset => {
        const slot = this.entity.sound.addSlot(asset.key, asset);
        slot._initialVolume = slot.volume;
        this.musicSlotKeys.add(asset.key);
        if (this.preloadMusicAssets) {
            if (this.entity.sound.slot(asset.key) && !this.entity.sound.slot(asset.key).isLoaded) {
                this.entity.sound.slot(asset.key).load();
                this.entity.sound.slot(asset.key).once('load', () => {
                    playMusicTask(asset.key);
                });
            } else {
                if (this.entity.sound.slot(asset.key).isLoaded) {
                    playMusicTask(asset.key);
                }
            }
        }
    });

    this.setMusicVolume(SoundController.musicVolume);
};

SoundController.prototype._loadAndPlayAsset = function (key) {
    if (!this.entity.sound.slot(key)) return console.warn('No sound with key ' + key);

    if (!this.entity.sound.slot(key).isLoaded) {
        this.entity.sound.slot(key).load();
        this.entity.sound.slot(key).once('load', () => {
            this.entity.sound.slot(key).play();
        });
    } else {
        this.entity.sound.slot(key).play();
    }
};


/* volume control */

SoundController.prototype.updateVolume = function () {
    this.app.systems.sound.volume = SoundController.masterVolume * SoundController.apiVolumeMultiplier;
};

SoundController.prototype.setMasterVolume = function (volume) {
    SoundController.masterVolume = volume;
    this.updateVolume();
};

SoundController.prototype.setVolumeMultiplier = function (volume) {
    SoundController.apiVolumeMultiplier = volume;
    this.updateVolume();
};


// fps.js
if (typeof(document) !== "undefined") {
    /*! FPSMeter 0.3.1 - 9th May 2013 | https://github.com/Darsain/fpsmeter */
    (function(m,j){function s(a,e){for(var g in e)try{a.style[g]=e[g]}catch(j){}return a}function H(a){return null==a?String(a):"object"===typeof a||"function"===typeof a?Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof a}function R(a,e){if("array"!==H(e))return-1;if(e.indexOf)return e.indexOf(a);for(var g=0,j=e.length;g<j;g++)if(e[g]===a)return g;return-1}function I(){var a=arguments,e;for(e in a[1])if(a[1].hasOwnProperty(e))switch(H(a[1][e])){case "object":a[0][e]=
    I({},a[0][e],a[1][e]);break;case "array":a[0][e]=a[1][e].slice(0);break;default:a[0][e]=a[1][e]}return 2<a.length?I.apply(null,[a[0]].concat(Array.prototype.slice.call(a,2))):a[0]}function N(a){a=Math.round(255*a).toString(16);return 1===a.length?"0"+a:a}function S(a,e,g,j){if(a.addEventListener)a[j?"removeEventListener":"addEventListener"](e,g,!1);else if(a.attachEvent)a[j?"detachEvent":"attachEvent"]("on"+e,g)}function D(a,e){function g(a,b,d,c){return y[0|a][Math.round(Math.min((b-d)/(c-d)*J,J))]}
    function r(){f.legend.fps!==q&&(f.legend.fps=q,f.legend[T]=q?"FPS":"ms");K=q?b.fps:b.duration;f.count[T]=999<K?"999+":K.toFixed(99<K?0:d.decimals)}function m(){z=A();L<z-d.threshold&&(b.fps-=b.fps/Math.max(1,60*d.smoothing/d.interval),b.duration=1E3/b.fps);for(c=d.history;c--;)E[c]=0===c?b.fps:E[c-1],F[c]=0===c?b.duration:F[c-1];r();if(d.heat){if(w.length)for(c=w.length;c--;)w[c].el.style[h[w[c].name].heatOn]=q?g(h[w[c].name].heatmap,b.fps,0,d.maxFps):g(h[w[c].name].heatmap,b.duration,d.threshold,
    0);if(f.graph&&h.column.heatOn)for(c=u.length;c--;)u[c].style[h.column.heatOn]=q?g(h.column.heatmap,E[c],0,d.maxFps):g(h.column.heatmap,F[c],d.threshold,0)}if(f.graph)for(p=0;p<d.history;p++)u[p].style.height=(q?E[p]?Math.round(O/d.maxFps*Math.min(E[p],d.maxFps)):0:F[p]?Math.round(O/d.threshold*Math.min(F[p],d.threshold)):0)+"px"}function k(){20>d.interval?(x=M(k),m()):(x=setTimeout(k,d.interval),P=M(m))}function G(a){a=a||window.event;a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=
    !1,a.cancelBubble=!0);b.toggle()}function U(){d.toggleOn&&S(f.container,d.toggleOn,G,1);a.removeChild(f.container)}function V(){f.container&&U();h=D.theme[d.theme];y=h.compiledHeatmaps||[];if(!y.length&&h.heatmaps.length){for(p=0;p<h.heatmaps.length;p++){y[p]=[];for(c=0;c<=J;c++){var b=y[p],e=c,g;g=0.33/J*c;var j=h.heatmaps[p].saturation,m=h.heatmaps[p].lightness,n=void 0,k=void 0,l=void 0,t=l=void 0,v=n=k=void 0,v=void 0,l=0.5>=m?m*(1+j):m+j-m*j;0===l?g="#000":(t=2*m-l,k=(l-t)/l,g*=6,n=Math.floor(g),
    v=g-n,v*=l*k,0===n||6===n?(n=l,k=t+v,l=t):1===n?(n=l-v,k=l,l=t):2===n?(n=t,k=l,l=t+v):3===n?(n=t,k=l-v):4===n?(n=t+v,k=t):(n=l,k=t,l-=v),g="#"+N(n)+N(k)+N(l));b[e]=g}}h.compiledHeatmaps=y}f.container=s(document.createElement("div"),h.container);f.count=f.container.appendChild(s(document.createElement("div"),h.count));f.legend=f.container.appendChild(s(document.createElement("div"),h.legend));f.graph=d.graph?f.container.appendChild(s(document.createElement("div"),h.graph)):0;w.length=0;for(var q in f)f[q]&&
    h[q].heatOn&&w.push({name:q,el:f[q]});u.length=0;if(f.graph){f.graph.style.width=d.history*h.column.width+(d.history-1)*h.column.spacing+"px";for(c=0;c<d.history;c++)u[c]=f.graph.appendChild(s(document.createElement("div"),h.column)),u[c].style.position="absolute",u[c].style.bottom=0,u[c].style.right=c*h.column.width+c*h.column.spacing+"px",u[c].style.width=h.column.width+"px",u[c].style.height="0px"}s(f.container,d);r();a.appendChild(f.container);f.graph&&(O=f.graph.clientHeight);d.toggleOn&&("click"===
    d.toggleOn&&(f.container.style.cursor="pointer"),S(f.container,d.toggleOn,G))}"object"===H(a)&&a.nodeType===j&&(e=a,a=document.body);a||(a=document.body);var b=this,d=I({},D.defaults,e||{}),f={},u=[],h,y,J=100,w=[],W=0,B=d.threshold,Q=0,L=A()-B,z,E=[],F=[],x,P,q="fps"===d.show,O,K,c,p;b.options=d;b.fps=0;b.duration=0;b.isPaused=0;b.tickStart=function(){Q=A()};b.tick=function(){z=A();W=z-L;B+=(W-B)/d.smoothing;b.fps=1E3/B;b.duration=Q<L?B:z-Q;L=z};b.pause=function(){x&&(b.isPaused=1,clearTimeout(x),
    C(x),C(P),x=P=0);return b};b.resume=function(){x||(b.isPaused=0,k());return b};b.set=function(a,c){d[a]=c;q="fps"===d.show;-1!==R(a,X)&&V();-1!==R(a,Y)&&s(f.container,d);return b};b.showDuration=function(){b.set("show","ms");return b};b.showFps=function(){b.set("show","fps");return b};b.toggle=function(){b.set("show",q?"ms":"fps");return b};b.hide=function(){b.pause();f.container.style.display="none";return b};b.show=function(){b.resume();f.container.style.display="block";return b};b.destroy=function(){b.pause();
    U();b.tick=b.tickStart=function(){}};V();k()}var A,r=m.performance;A=r&&(r.now||r.webkitNow)?r[r.now?"now":"webkitNow"].bind(r):function(){return+new Date};for(var C=m.cancelAnimationFrame||m.cancelRequestAnimationFrame,M=m.requestAnimationFrame,r=["moz","webkit","o"],G=0,k=0,Z=r.length;k<Z&&!C;++k)M=(C=m[r[k]+"CancelAnimationFrame"]||m[r[k]+"CancelRequestAnimationFrame"])&&m[r[k]+"RequestAnimationFrame"];C||(M=function(a){var e=A(),g=Math.max(0,16-(e-G));G=e+g;return m.setTimeout(function(){a(e+
    g)},g)},C=function(a){clearTimeout(a)});var T="string"===H(document.createElement("div").textContent)?"textContent":"innerText";D.extend=I;window.FPSMeter=D;D.defaults={interval:100,smoothing:10,show:"fps",toggleOn:"click",decimals:1,maxFps:60,threshold:100,position:"absolute",zIndex:10,left:"5px",top:"5px",right:"auto",bottom:"auto",margin:"0 0 0 0",theme:"dark",heat:0,graph:0,history:20};var X=["toggleOn","theme","heat","graph","history"],Y="position zIndex left top right bottom margin".split(" ")})(window);(function(m,j){j.theme={};var s=j.theme.base={heatmaps:[],container:{heatOn:null,heatmap:null,padding:"5px",minWidth:"95px",height:"30px",lineHeight:"30px",textAlign:"right",textShadow:"none"},count:{heatOn:null,heatmap:null,position:"absolute",top:0,right:0,padding:"5px 10px",height:"30px",fontSize:"24px",fontFamily:"Consolas, Andale Mono, monospace",zIndex:2},legend:{heatOn:null,heatmap:null,position:"absolute",top:0,left:0,padding:"5px 10px",height:"30px",fontSize:"12px",lineHeight:"32px",fontFamily:"sans-serif",
    textAlign:"left",zIndex:2},graph:{heatOn:null,heatmap:null,position:"relative",boxSizing:"padding-box",MozBoxSizing:"padding-box",height:"100%",zIndex:1},column:{width:4,spacing:1,heatOn:null,heatmap:null}};j.theme.dark=j.extend({},s,{heatmaps:[{saturation:0.8,lightness:0.8}],container:{background:"#222",color:"#fff",border:"1px solid #1a1a1a",textShadow:"1px 1px 0 #222"},count:{heatOn:"color"},column:{background:"#3f3f3f"}});j.theme.light=j.extend({},s,{heatmaps:[{saturation:0.5,lightness:0.5}],
    container:{color:"#666",background:"#fff",textShadow:"1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},count:{heatOn:"color"},column:{background:"#eaeaea"}});j.theme.colorful=j.extend({},s,{heatmaps:[{saturation:0.5,lightness:0.6}],container:{heatOn:"backgroundColor",background:"#888",color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.2)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},column:{background:"#777",backgroundColor:"rgba(0,0,0,.2)"}});j.theme.transparent=
    j.extend({},s,{heatmaps:[{saturation:0.8,lightness:0.5}],container:{padding:0,color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.5)"},count:{padding:"0 5px",height:"40px",lineHeight:"40px"},legend:{padding:"0 5px",height:"40px",lineHeight:"42px"},graph:{height:"40px"},column:{width:5,background:"#999",heatOn:"backgroundColor",opacity:0.5}})})(window,FPSMeter);    
}

var Fps = pc.createScript('fps');

Fps.prototype.initialize = function () {
    this.fps = new FPSMeter({heat: true, graph: true});
};

Fps.prototype.update = function (dt) {
    this.fps.tick();
};


// eventTypes.js
var EventTypes = pc.createScript('eventTypes');

/* General */
EventTypes.APP_LOADED = 'app:onLoaded';
EventTypes.SAVE_APP = 'app:save';
EventTypes.SAVEDATA_LOADED = 'app:savedataLoaded';
EventTypes.POSTINITIALIZE = 'postinitialize';

/* Assets loader */
EventTypes.ASSETS_LOADER_STARTED_LOADING = 'assetsLoader:started';
EventTypes.ASSETS_LOADER_PROGRESS = 'assetsLoader:progress';
EventTypes.ASSETS_LOADER_COMPLETE = 'assetsLoader:complete';
EventTypes.ASSETS_LOADER_ASSET_LOADED = 'assetsLoader:assetLoaded';
EventTypes.ASSETS_LOADER_ASSET_FAILED = 'assetsLoader:assetFailed';

/* Gameplay */
EventTypes.LEVEL_RESET = 'level:reset';
EventTypes.LEVEL_FINISHED = 'level:finished';
EventTypes.LEVEL_CLOTHES_READY = 'level:clothesReady';

/* Game data */
EventTypes.GAME_DATA_READY = 'gameData:ready';

/* Location */
EventTypes.LOCATION_CHANGED = 'location:changed';
EventTypes.SET_NEXT_CITY = 'location:setNextCity';
EventTypes.RESTORE_LOCATION_FOG = 'location:restoreFog';

/* Celebrity */
EventTypes.SHOW_CELEBRITY_UI = 'celebrity:show';
EventTypes.HIDE_CELEBRITY_UI = 'celebrity:hide';
EventTypes.SHOW_CELEBRITY_MESSAGE = 'celebrity:showMessage';
EventTypes.TWEEN_CELEBRITY_TO_OPTION = 'celebrity:tweenToOption';

/* Localization */
EventTypes.LANGUAGE_SELECTED = 'localization:selectedLanguage';

/* Shop */
EventTypes.ENTER_SHOP = 'shop:enter';
EventTypes.QUIT_SHOP = 'shop:quit';
EventTypes.SHOP_CATEGORY_SELECTED = 'shop:categorySelected';
EventTypes.SHOP_TAB_SELECTED = 'shop:tabSelected';
EventTypes.SHOP_EQUIP_ITEM = 'shop:equipItem';
EventTypes.SHOP_UNEQUIP_ITEM = 'shop:unequipItem';

EventTypes.SHOP_BUILD_CATEGORIES = 'shop:buildCategories';

EventTypes.SHOW_SHOP_TAB_NOTIFICATION_ICON = 'shop:showTabNotificationIcon';
EventTypes.HIDE_SHOP_TAB_NOTIFICATION_ICON = 'shop:hideTabNotificationIcon';

EventTypes.EQUIP_PLAYER_MODEL_SKIN = 'shop:equipPlayerModelSkin';
EventTypes.EQUIP_PLAYER_EFFECT = 'shop:equipPlayerEffect';
EventTypes.UNEQUIP_PLAYER_EFFECT = 'shop:unequipPlayerEffect';
EventTypes.EQUIP_FINISHER = 'shop:equipFinisher';
EventTypes.EQUIP_PET = 'shop:equipPet';
EventTypes.UNEQUIP_PET = 'shop:unequipPet';

EventTypes.ACTIVATE_FINISHER = 'player:activateFinisher';

EventTypes.ShopItem = {
    EARNED_VIA_BUTTON: 'shopItem:earnedViaButton',
    STATE_CHANGED: 'shopItem:stateChanged',
    INIT_BUTTONS: 'shopItem:initButtons'
};

/* Effects */
EventTypes.SHOW_PLAYER_CLOTH_CHANGE_EFFECT = 'effect:playerClothChange';

/* Tutorial */
EventTypes.SHOW_GAMEPLAY_TUTORIAL_HAND = 'tutorial:gameplay:show';
EventTypes.HIDE_GAMEPLAY_TUTORIAL_HAND = 'tutorial:gameplay:hide';

/* Score */
EventTypes.USERNAME_CHANGED = 'username:changed';
EventTypes.SCORE_CHANGED = 'score:changed';
EventTypes.LEVEL_CHANGED = 'level:changed';
EventTypes.CHAPTER_CHANGED = 'chapter:changed';
EventTypes.GEMS_AMOUNT_CHANGED = 'gems:changed';

EventTypes.GEMS_BOOST_LEVEL_CHANGED = 'gemsBoost:changed';
EventTypes.LIKES_BOOST_LEVEL_CHANGED = 'likesBoost:changed';

/* Camera */
EventTypes.INTERNAL_CAMERA_TRANSITION_FINISHED = 'camera:internalTransitionFinished';
EventTypes.CAMERA_TRANSITION_FINISHED = 'camera:transitionFinished';

/* Feedback */
EventTypes.SHOW_FEEDBACK_EFFECT = 'feedback:showEffect';

/* Button */
EventTypes.BUTTON_PRESSED = 'button:pressed';
EventTypes.BUTTON_UP = 'button:up';
EventTypes.BUTTON_DOWN = 'button:down';
EventTypes.BUTTON_DRAG = 'button:drag';

/* UI */
EventTypes.GUI = {
    SCREEN_SHOWN:'gui:screenShown',
    SCREEN_HIDDEN: 'gui:screenHidden'
};

/* Screen size/scale */
EventTypes.Screen = {
    RESIZED: 'app:screen:resized',
    SET_SCALE_BLEND: 'app:screen:setScaleBlend',
    SET_SHADOWS_ENABLED: 'app:screen:shadowsEnabled'
};

/* UI elements animation */
EventTypes.UI_ELEMENT = {
    APPEAR: 'uiElement:appear',
    APPEAR_MANUALLY: 'uiElement:appearManually',
    DISAPPEAR: 'uiElement:disappear',
    APPEARED: 'uiElement:appeared',
    DISAPPEARED: 'uiElement:disappeared',
};

/* transition screen */
EventTypes.SHOW_TRANSITION_SCREEN = 'show:transitionScreen';
EventTypes.HIDE_TRANSITION_SCREEN = 'hide:transitionScreen';

/* Audio */
EventTypes.ENABLE_MUSIC = 'music:enable';
EventTypes.DISABLE_MUSIC = 'music:disable';
EventTypes.ENABLE_SFX = 'sfx:enable';
EventTypes.DISABLE_SFX = 'sfx:disable';
EventTypes.SET_SFX_VOLUME = 'sfx:setVolume';
EventTypes.SET_MUSIC_VOLUME = 'music:setVolume';
EventTypes.PLAY_MUSIC = 'music:play';
EventTypes.STOP_MUSIC = 'music:stop';
EventTypes.CHOKE_MUSIC = 'music:choke';
EventTypes.UNCHOKE_MUSIC = 'music:unchoke';
EventTypes.PLAY_EXTERNAL_SFX = 'sfx:playExternal';
EventTypes.PLAY_SFX = 'sfx:play';
EventTypes.STOP_SFX = 'sfx:stop';
EventTypes.MUTE_SOUND = 'audio:mute';
EventTypes.UNMUTE_SOUND = 'audio:unmute';
EventTypes.SOUND_STATE_CHANGED = 'sound:stateChanged';
EventTypes.MUSIC_STATE_CHANGED = 'music:stateChanged';
EventTypes.SET_MASTER_VOLUME = 'audio:setMasterVolume';


/* Quality */
EventTypes.QUALITY_CHANGED = 'quality:changed';
EventTypes.QUALITY_UPDATE = 'quality:update';
EventTypes.QUALITY_NEXT = 'quality:next';
EventTypes.VIEWPORT_RESIZE = 'viewport:resize';
EventTypes.MEASURE_PERFORMANCE = 'performance:measure';


/* Input */
EventTypes.TAP_AT = 'input:tapAt';
EventTypes.INPUT_DOWN = 'input:down';
EventTypes.INPUT_UP = 'input:up';
EventTypes.INPUT_MOVE = 'input:move';
EventTypes.SWIPE_LEFT = 'input:swipeLeft';
EventTypes.SWIPE_RIGHT = 'input:swipeRight';
EventTypes.SWIPE_UP = 'input:swipeUp';
EventTypes.SWIPE_DOWN = 'input:swipeDown';

/* GameInput */
EventTypes.GameInput = {
    MOUSE_DOWN: "gameInput:mouse_down",
    MOUSE_UP: "gameInput:mouse_up",
    MOUSE_MOVE: "gameInput:mouse_move",
    TOUCH_STARTED: "gameInput:touch_started",
    TOUCH_ENDED: "gameInput:touch_ended",
    TOUCH_UPDATED: "gameInput:touch_updated",
    TOUCH_MOVE: "gameInput:touch_move",
    KEYBOARD_STARTED: "gameInput:keyboard_started",
    KEYBOARD_ENDED: "gameInput:keyboard_ended",
    KEYBOARD_UPDATED: "gameInput:keyboard_updated",
};


EventTypes.afterAll = async function (...eventNames) {
    return Promise.all(eventNames.map(eventKey => new Promise((resolve, reject) => {
        pc.AppBase.getApplication().once(eventKey, () => resolve());
    }))); 
};

EventTypes.afterAny = async function (...eventNames) {
    let _alreadyFulfilled = false;
    const promises = eventNames.map(eventKey => new Promise((resolve, reject) => {
        pc.AppBase.getApplication().once(eventKey, () => {
            if(!_alreadyFulfilled) {
                _alreadyFulfilled = true;
                resolve(eventKey);
            }
        });
    }));
    return Promise.any(promises); 
};

// utils.js
/* jshint esversion: 6 */
var Utils = pc.createScript('utils');

Utils.prototype.initialize = function () {
    Utils.app = this.app;
};

Utils.prototype.update = function (dt) {

};

Utils.stopTween = function (...tweens) {
    tweens.forEach(tween => {
        if (tween && tween.playing) tween.stop();
    });
};

Utils.formatMoney = function (value, locale = undefined) {
    return new Intl.NumberFormat(locale || LocalizationManager.getClientLanguage()).format(value);
};

Utils.postMessage = function (message) {
    if (window.parent) {
        window.parent.postMessage(message, "*");
    }
};

Utils.resetAllWaiters = function() {
    const app = pc.AppBase.getApplication();
    if(app) {
        app.stopAllTweens(app.root);
    }
}

Utils.wait = function (duration) {
    return new Promise((resolve, reject) => {
        const app = pc.AppBase.getApplication();
        if (duration !== undefined) {
            if (app) {
                pc.AppBase.getApplication().root.delayedCall(duration, () => {
                    resolve();
                })

            } else {
                setTimeout(() => resolve(), duration);
            }
        } else {
            resolve();
        }
    })
};

Utils.setSpriteElement = function (elementImage, spriteAsset) {
    const app = pc.AppBase.getApplication();
    const atlasFrameKey = spriteAsset.data.frameKeys[0];
    const textureAtlas = app.assets.get(spriteAsset.data.textureAtlasAsset);
    const rect = textureAtlas.resource.frames[atlasFrameKey].rect;
    elementImage.element.spriteAsset = spriteAsset.id;
    elementImage.element.width = rect.z;
    elementImage.element.height = rect.w;
};

Utils.worldToLocalPosition = function (entity, worldPosition) {
    if (!entity.parent) {
        console.warn('worldToLocalPosition: entity is not parented!');
        return pc.Vec3.ZERO;
    }
    this._transformMatrix = this._transformMatrix || new pc.Mat4();
    this._transformMatrix.copy(entity.parent.getWorldTransform());
    return this._transformMatrix.invert().transformPoint(worldPosition)
};

Utils.localToWorldPosition = function (entity, localPosition) {
    this._transformMatrix = this._transformMatrix || new pc.Mat4();
    this._transformMatrix.copy(entity.getWorldTransform());
    return this._transformMatrix.transformPoint(localPosition)
};


Utils.worldToLocalEulerAngles = function (entity, targetEulerAngles) {
    const initialLocalAngles = entity.getLocalEulerAngles().clone();
    entity.setEulerAngles(targetEulerAngles);
    const targetLocalAngles = entity.getLocalEulerAngles().clone();
    entity.setLocalEulerAngles(initialLocalAngles);
    return targetLocalAngles;
};


Utils.tweenOpacity = function (entity, opacity, duration, ease = pc.Linear, delay = 0) {
    return new Promise((resolve, reject) => {
        entity.tween(entity.element)
            .to({ opacity: opacity }, duration, ease)
            .delay(delay)
            .onComplete(() => resolve())
            .start();
    });
};

Utils.tweenPosition = function (entity, localPosition, duration, ease = pc.Linear, delay = 0) {
    return new Promise((resolve, reject) => {
        entity.tween(entity.getLocalPosition())
            .to(localPosition, duration, ease)
            .delay(delay)
            .onComplete(() => resolve())
            .start();
    });
};

Utils.tweenScale = function (entity, localScale, duration, ease = pc.Linear, delay = 0) {
    return new Promise((resolve, reject) => {
        entity.tween(entity.getLocalScale())
            .to(localScale, duration, ease)
            .delay(delay)
            .onComplete(() => resolve())
            .start();
    });
};


Utils._fadeDiffuseRecursive = function (entity, fadeValue, duration) {
    if (entity.render) {
        entity.render.meshInstances.forEach(mi => {
            if (mi.material.diffuse.equals(pc.Color.WHITE)) {
                mi.material = mi.material.clone();
                mi.material.diffuse = new pc.Color().fromString("#FEFEFE");
                mi.material.update();
            }
            if (!mi.__originalDiffuse) mi.__originalDiffuse = mi.material.diffuse.clone();
            mi.__diffuseValues = mi.__diffuseValues || mi.__originalDiffuse.clone();
            const targetDiffise = { r: mi.__originalDiffuse.r * fadeValue, g: mi.__originalDiffuse.g * fadeValue, b: mi.__originalDiffuse.b * fadeValue }
            entity.tween(mi.__diffuseValues)
                .to(targetDiffise, duration, pc.Linear)
                .onUpdate(() => {
                    mi.setParameter('material_diffuse', Utils.getGammaCorrectedColorUniform(mi.__diffuseValues));
                })
                .start();
        })
    }
    entity.children.forEach(child => Utils._fadeDiffuseRecursive(child, fadeValue, duration));
};


Utils._tweenOpacityRecursive = function (entity, opacityValue, duration) {
    if (entity.render) {
        entity.render.meshInstances.forEach(mi => {
            if (mi.material.blendType !== pc.BLEND_NORMAL && mi.material.blendType !== pc.BLEND_ADDITIVEALPHA) {
                mi.material = mi.material.clone();
                mi.material.blendType = pc.BLEND_NORMAL;
                mi.material.opacity = 0.999;
                mi.material.update();
            }
            if (!mi.__originalOpacity) mi.__originalOpacity = mi.material.opacity;
            mi.__currentOpacity = mi.__originalOpacity;
            if (duration > 0) {
                entity.tween(mi)
                    .to({ __currentOpacity: opacityValue }, duration, pc.Linear)
                    .onUpdate(() => {
                        mi.setParameter('material_opacity', mi.__currentOpacity);
                    })
                    .start();
            } else {
                mi.setParameter('material_opacity', opacityValue);
            }

        })
    }
    entity.children.forEach(child => Utils._tweenOpacityRecursive(child, opacityValue, duration))
};

Utils.getGammaCorrectedColorUniform = function (color, g, b) {
    const app = pc.AppBase.getApplication();
    const gammaCorrectionFactor = app.scene.gammaCorrection === pc.GAMMA_SRGB ? 2.2 : 1;

    if (color.r !== undefined && color.g !== undefined && color.b !== undefined) {
        return [
            Math.pow(color.r, gammaCorrectionFactor),
            Math.pow(color.g, gammaCorrectionFactor),
            Math.pow(color.b, gammaCorrectionFactor)
        ]
    } else {
        return [
            Math.pow(color, gammaCorrectionFactor),
            Math.pow(g, gammaCorrectionFactor),
            Math.pow(b, gammaCorrectionFactor)
        ]
    }
};


pc.Entity.prototype.delayedCall = function (durationMS, f, scope) {
    var n = 0;
    while (this["delayedExecuteTween" + n]) {
        n++;
    }
    var id = "delayedExecuteTween" + n;
    var m;
    this[id] = this.tween(m)
        .to(1, durationMS / 1000, pc.Linear)
        ;
    this[id].start();

    this[id].once("complete", function () {
        f.call(scope);
        this[id] = null;
    }, this);

    return this[id];
};

Utils.raycastAll = function (from, to, results) {
    results = results || [];
    lastResult = this.app.systems.rigidbody.raycastFirst(from, to);
    if (lastResult) {
        if (lastResult.entity) {
            for (var i = 0; i < results.length; i++) {
                if (results[i] === lastResult.entity) {
                    return results;
                }
            }
            results.push(lastResult.entity);
            Utils.raycastAll(lastResult.point.sub(lastResult.normal.scale(0.01)), to, results);
        }
    }
    return results;
};

/**
 *  Raycast through multiple entities returning RaycastResult instances (entity, point, normal) instead of entities. 
 **/
Utils.raycastAllAdvanced = function (from, to, results) {
    results = results || [];
    lastResult = this.app.systems.rigidbody.raycastFirst(from, to);
    if (lastResult) {
        if (lastResult.entity) {
            // this prevents rays from bouncing off the same entities
            // in a loop causing ammojs to crash
            for (var i = 0; i < results.length; i++) {
                if (results[i].entity === lastResult.entity) {
                    return results;
                }
            }
            results.push(lastResult);
            Utils.raycastAllAdvanced(lastResult.point.sub(lastResult.normal.scale(0.01)), to, results);
        }
    }
    return results;
};

pc.Entity.prototype.childrenAlphaAppear = function (initialAlpha, duration, sine, delay) {
    for (var i = this.children.length - 1; i > -1; i--) {
        var child = this.children[i];
        if (child instanceof pc.Entity) {
            child.childrenAlphaAppear(initialAlpha, duration, sine, delay);
        }
        if (child.element) {
            var targetAlpha = child.element.opacity;
            child.element.opacity = initialAlpha;
            child.tween(child.element)
                .to({ opacity: targetAlpha }, duration, sine)
                .delay(delay)
                .start();
        }
    }
};

pc.GraphicsDevice.prototype.updateClientRect = function () {
    if (window.visualViewport) {
        this.clientRect = this.canvas.getBoundingClientRect();
        this.clientRect.x = window.visualViewport.offsetLeft;
        this.clientRect.y = window.visualViewport.offsetTop;
        this.clientRect.width = window.visualViewport.width;
        this.clientRect.height = window.visualViewport.height;
    } else {
        this.clientRect = this.canvas.getBoundingClientRect();
    }
};

Utils.lerpColor = function (colorA, colorB, progress, targetColor) {
    return targetColor.set(colorA.r + (colorB.r - colorA.r) * progress, colorA.g + (colorB.g - colorA.g) * progress, colorA.b + (colorB.b - colorA.b) * progress, 1);
};

Utils.distanceBetween = function (x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};

Utils.checkContact = function (entityA, entityB) {
    var pos1 = entityA.getPosition();
    var pos2 = entityB.getPosition();
    return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.z - pos2.z) * (pos1.z - pos2.z)) <= (entityA.script.item.collisionDiameter * entityA.collisionScale / 2 + entityB.script.item.collisionDiameter * entityB.collisionScale / 2) &&
        Math.abs(pos1.y - pos2.y) <= (entityA.script.item.collisionHeight * entityA.collisionScale / 2 + entityB.script.item.collisionHeight * entityB.collisionScale / 2);
};


Utils.checkContactRough = function (entityA, entityB) {
    var scaleFactor = 1.1;
    var pos1 = entityA.getPosition();
    var pos2 = entityB.getPosition();
    return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.z - pos2.z) * (pos1.z - pos2.z)) <= (entityA.script.item.collisionDiameter * entityA.collisionScale * scaleFactor / 2 + entityB.script.item.collisionDiameter * entityB.collisionScale * scaleFactor / 2) &&
        Math.abs(pos1.y - pos2.y) <= (entityA.script.item.collisionHeight * entityA.collisionScale * scaleFactor / 2 + entityB.script.item.collisionHeight * entityB.collisionScale * scaleFactor / 2);
};


Utils.distanceXZ = function (pos1, pos2) {
    return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.z - pos2.z) * (pos1.z - pos2.z));
};

Utils.distanceBetweenEntities = function (posA, posB) {
    return Math.sqrt((posA.x - posB.x) * (posA.x - posB.x) + (posA.y - posB.y) * (posA.y - posB.y) + (posA.z - posB.z) * (posA.z - posB.z));
};

Utils.tweenText = function (textElement, initialValue, targetValue, duration, delay, easing) {
    textElement.element.textValue = initialValue;
    textElement.element.text = '' + Math.round(initialValue);
    textElement.tween(textElement.element)
        .to({ textValue: targetValue }, duration, easing)
        .delay(delay)
        .onUpdate(function () { textElement.element.text = ('' + Math.round(textElement.element.textValue)); })
        .onComplete(function () { textElement.element.text = ('' + targetValue); })
        .start();
};

Utils.tweenColor = function (color, targetColor, duration, updateCallback, delay = 0, ease = pc.Linear) {
    pc.AppBase.getApplication()
        .tween(color)
        .to(targetColor, duration, ease)
        .delay(delay)
        .onUpdate(() => {
            if (updateCallback) {
                updateCallback(color);
            }
        })
        .onComplete(() => {
            if (updateCallback) {
                updateCallback(color);
            }
        })
        .start();
};

Utils.getRandomItem = function (objects, startIndex, length) {

    if (objects === null) { return null; }
    if (startIndex === undefined) { startIndex = 0; }
    if (length === undefined) { length = objects.length; }

    var randomIndex = startIndex + Math.floor(Math.random() * length);

    return objects[randomIndex] === undefined ? null : objects[randomIndex];

};


Utils.getRandomItemBut = function (objects, butObject) {
    return Utils.getRandomItem(objects.slice().filter(o => o !== butObject));
};

Utils.removeRandomItem = function (objects, startIndex, length) {

    if (objects === null) { // undefined or null
        return null;
    }

    if (startIndex === undefined) { startIndex = 0; }
    if (length === undefined) { length = objects.length; }

    var randomIndex = startIndex + Math.floor(Math.random() * length);
    if (randomIndex < objects.length) {
        var removed = objects.splice(randomIndex, 1);
        return removed[0] === undefined ? null : removed[0];
    }
    else {
        return null;
    }

};

Utils.shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

Utils.humanizeTime = function (seconds) {
    var restSeconds = seconds;
    var hours = Math.floor(restSeconds / 3600);
    restSeconds %= 3600;
    var minutes = Math.floor(restSeconds / 60);
    restSeconds %= 60;

    return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (restSeconds < 10 ? "0" : "") + Math.floor(restSeconds);
};

Utils.humanizeTimeShort = function (seconds) {
    var restSeconds = seconds;
    var hours = Math.floor(restSeconds / 3600);
    restSeconds %= 3600;
    var minutes = Math.floor(restSeconds / 60);
    restSeconds %= 60;

    return (minutes < 10 ? "0" : "") + minutes + ":" + (restSeconds < 10 ? "0" : "") + Math.floor(restSeconds);
};

Utils.getBoundingBox = function (entity, extendDistance) {
    if (entity.model && entity.model.meshInstances && entity.model.meshInstances.length > 0) {
        var meshInstances = entity.model.meshInstances;
        var bbox = new pc.BoundingBox();
        bbox.copy(meshInstances[0].aabb);
        for (var i = 1; i < meshInstances.length; i++) {
            bbox.add(meshInstances[i].aabb);
        }
        if (extendDistance) {
            bbox.halfExtents.add(extendDistance);
        }
        return bbox;
    }
    return null;

};

/**
 * Normalize an angle to the [-Pi, Pi] range.
 */
Utils.normalizeAngle = function (angle) {
    angle = angle % (2 * Math.PI);

    return angle > Math.PI ? angle - 2 * Math.PI : angle < -Math.PI ? angle + 2 * Math.PI : angle;
};

Utils.normalizeAngleDegrees = function (angle) {
    angle = angle % 360;

    return angle > 180 ? angle - 360 : angle < -180 ? angle + 360 : angle;
};

Utils.getYawFromRotation = function (quat) {
    Utils._transformedForward = Utils._transformedForward || new pc.Vec3();
    quat.transformVector(pc.Vec3.FORWARD, Utils._transformedForward);
    return Math.atan2(-Utils._transformedForward.x, -Utils._transformedForward.z) * pc.math.RAD_TO_DEG;
};


Utils.getYawBetweenVectors = function (positionA, positionB) {
    return Math.atan2(positionB.x - positionA.x, positionB.z - positionA.z) * pc.math.RAD_TO_DEG;
};
/**
 *  Returns the value (angle)/360
 */

Utils.getAngleValue = function (angle) {
    angle = (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

    return angle / (2 * Math.PI);
};

Utils.angleDifference = function (angle1, angle2) {
    const diff = (angle2 - angle1 + 180) % 360 - 180;
    return diff < -180 ? diff + 360 : diff;
};

Utils.randomInRangeSigned = function (a, b) {
    if (Math.random() <= 0.5) {
        return pc.math.random(Math.min(-a, -b), Math.max(-a, -b));
    } else {
        return pc.math.random(Math.min(a, b), Math.max(a, b));
    }
};

Utils.vibrate = function (pattern) {
    if (GameplayController.enableVibration && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(pattern);
    }
};
Utils.setMat4Forward = (function () {
    var x, y, z;

    x = new pc.Vec3();
    y = new pc.Vec3();
    z = new pc.Vec3();

    return function (mat4, forward, up) {
        // Inverse the forward direction as +z is pointing backwards due to the coordinate system
        z.copy(forward).scale(-1);
        y.copy(up).normalize();
        x.cross(y, z).normalize();
        y.cross(z, x);

        var r = mat4.data;

        r[0] = x.x;
        r[1] = x.y;
        r[2] = x.z;
        r[3] = 0;
        r[4] = y.x;
        r[5] = y.y;
        r[6] = y.z;
        r[7] = 0;
        r[8] = z.x;
        r[9] = z.y;
        r[10] = z.z;
        r[11] = 0;
        r[15] = 1;

        return mat4;
    };
}());


Utils.checkPointBelongsToSegment = function (px, py, startX, startY, endX, endY) {
    return (px >= Math.min(startX, endX) && px <= Math.max(startX, endX) && py >= Math.min(startY, endY) && py <= Math.max(startY, endY));
};

Utils.findLineCircleIntersections = function (cx, cy, radius, segmentStartX, segmentStartY, segmentEndX, segmentEndY, closerToSegmentStart = true) {
    let dx, dy, A, B, C, det, t;

    dx = segmentEndX - segmentStartX;
    dy = segmentEndY - segmentStartY;

    A = dx * dx + dy * dy;
    B = 2 * (dx * (segmentStartX - cx) + dy * (segmentStartY - cy));
    C = (segmentStartX - cx) * (segmentStartX - cx) +
        (segmentStartY - cy) * (segmentStartY - cy) -
        radius * radius;

    det = B * B - 4 * A * C;
    if ((A <= 0.0000001) || (det < 0)) {
        // No real solutions.
        return null;
    }
    else if (det == 0) {
        // One solution.
        t = -B / (2 * A);
        let resultingPoint = new pc.Vec2(segmentStartX + t * dx, segmentStartY + t * dy);
        return Utils.checkPointBelongsToSegment(resultingPoint.x, resultingPoint.y, segmentStartX, segmentStartY, segmentEndX, segmentEndY) ? resultingPoint : null;
    }
    else {
        // Two solutions.
        t = ((-B + Math.sqrt(det)) / (2 * A));
        let p1 = new pc.Vec2(segmentStartX + t * dx, segmentStartY + t * dy);

        t = ((-B - Math.sqrt(det)) / (2 * A));
        let p2 = new pc.Vec2(segmentStartX + t * dx, segmentStartY + t * dy);

        p1 = Utils.checkPointBelongsToSegment(p1.x, p1.y, segmentStartX, segmentStartY, segmentEndX, segmentEndY) ? p1 : null;
        p2 = Utils.checkPointBelongsToSegment(p2.x, p2.y, segmentStartX, segmentStartY, segmentEndX, segmentEndY) ? p2 : null;

        if (p1 && p2) {
            return (Utils.distanceBetween(segmentStartX, segmentStartY, p1.x, p1.y) <= Utils.distanceBetween(segmentStartX, segmentStartY, p2.x, p2.y)) ? (closerToSegmentStart ? p1 : p2) : (closerToSegmentStart ? p2 : p1);
        } else if (p1) {
            return p1;
        } else if (p2) {
            return p2;
        } else {
            return null;
        }
    }
};



!(function () {
    var MAX_CACHE = 256;

    var quats = [];
    var vecs = [];
    var nextQuat = 0;
    var nextVec = 0;

    for (var i = 0; i < MAX_CACHE; i++) {
        vecs.push(new pc.Vec3());
        quats.push(new pc.Quat());
    }

    function Q(existing) {
        var q = quats[nextQuat++ & (MAX_CACHE - 1)];
        if (existing !== false) q.copy(existing || pc.Quat.IDENTITY);
        return q;
    }

    function V(existing, y, z) {
        var v = vecs[nextVec++ & (MAX_CACHE - 1)];
        if (y !== undefined && z !== undefined) {
            var d = v.data;
            d[0] = existing;
            d[1] = y;
            d[2] = z;
            return v;
        }
        if (existing !== undefined) {
            var d1 = v.data;
            var d2 = existing.data;
            d1[0] = d2[0];
            d1[1] = d2[1];
            d1[2] = d2[2];
        }
        return v;
    }

    pc.Vec3.temp = V;
    pc.Quat.temp = Q;

    function angleBetween(vector1, vector2, up) {
        up = up || pc.Vec3.UP;
        return Math.atan2(V().cross(vector1, vector2).dot(up), vector1.dot(vector2)) * pc.math.RAD_TO_DEG;
    }

    pc.Vec3.prototype.angle = function (vector, up) { return angleBetween(this, vector, up); };

    function orthogonal(v) {

        var x = Math.abs(v.x);
        var y = Math.abs(v.y);
        var z = Math.abs(v.z);
        var other = x < y ? (x < z ? pc.Vec3.RIGHT : pc.Vec3.FORWARD)
            : (y < z ? pc.Vec3.UP : pc.Vec3.FORWARD);
        return V().cross(v, other);
    }

    function fromToRotation(v1, v2, q) {
        var kct = v1.dot(v2);
        q = q || Q();
        if (kct <= -0.999) {
            q.w = 0;
            var v = orthogonal(v1).normalize();
            q.x = v.x;
            q.y = v.y;
            q.z = v.z;
            return q;
        }

        var half = V(v1).add(v2).scale(0.5);
        q.w = v1.dot(half);
        var cross = V().cross(v1, half);
        q.x = cross.x;
        q.y = cross.y;
        q.z = cross.z;
        return q.normalize();
    }

    pc.Quat.prototype.fromToRotation = function (v1, v2) {
        return fromToRotation(v1, v2, this);
    };

    pc.Quat.prototype.twist = function (axis) {
        var orth = orthogonal(axis);
        var transformed = this.transformVector(orth, V());
        var flattened = V(transformed).sub(V(axis).scale(transformed.dot(axis))).normalize();
        var angle = Math.acos(orth.dot(flattened)) * pc.math.RAD_TO_DEG;
        return V(this.x, this.y, this.z).dot(axis) > 0 ? -angle : angle;
    };

    var m = new pc.Mat4();

    pc.Quat.prototype.lookAt = function (from, to, up) {
        m.setLookAt(from, to, up || pc.Vec3.UP);
        this.setFromMat4(m);
        return this;
    };

    var oldMul = pc.Vec3.prototype.mul;

    pc.Vec3.prototype.mul = function (p0, p1, p2) {
        if (p0 instanceof pc.Quat) {
            return p0.transformVector(this, this);
        } else
            return oldMul.call(this, p0, p1, p2);
    };
})();

// Constants.js
var Constants = pc.createScript('constants');

Constants.GAME_NAME = 'FashionBattle';
Constants.GAME_VERSION = 'v0.1';


Constants.Screens = {
    MAIN_MENU: 'Screen_MainMenu',
    GAMEPLAY: 'Screen_Gameplay',
    CELEBRITY: 'Screen_Celebrity',
    VICTORY: 'Screen_Victory',
    DEFEAT: 'Screen_Defeat',
    SETTINGS: 'Popup_Settings',
    HAMMER_GAME: 'Screen_HammerGame',
    CITY_UNLOCK: 'Screen_CityUnlock',
    CONCEPT_UNLOCK: 'Screen_ConceptUnlock',
    SHOP: 'Screen_Shop'
};

Constants.Cameras = {
    MAIN: 'Camera_Main',
    SHOP: 'Camera_Shop',
    DEBUG: 'Camera_Debug',
};


Constants.Storage = {
    CURRENT_LEVEL: 'level',
    CHAPTER: 'chapter',
    GEMS: 'gems',
    VIBRATION: 'vibration',
    MUSIC_VOLUME: 'musicVolue',
    SFX_VOLUME: 'sfxVolume',
    LIKES_BOOST_LEVEL: 'likesBoost',
    GEMS_BOOST_LEVEL: 'gemsBoost',
    RECENT_MATCH_RESULTS: 'recentMatchResults',
    CONCEPT_LOOP: 'conceptLoop',
    UNLOCKABLE_CONCEPTS: 'unlockableConcepts',
    CONCEPT_UNLOCK_PROGRESS: 'conceptUnlockProgress',
    CONCEPT_LEVELS: 'conceptLevels',
    LANGUAGE: 'language',
    SHOP_DATA: 'shopData',
    UNLOCKED_CELEBRITIES: 'celebrities',
};

Constants.ShopCategory = {
    Models: "Models",
    Effects: "Effects",
    Finishers: "Finishers",
    Pets: "Pets"
};

Constants.ShopTab = {
    Basic: "Basic",
    Star: "Star",
    Premium: "Premium",
    Angels: "Angels"
};

Constants.ClothingType = {
    Hair: "Hair",
    Dress: "Dress",
    Top: "Top",
    Bottom: "Bottom",
    Shoes: "Shoes",
    Accessories: "Accessories"
};

Constants.ChoiceCorrectness = {
    Celebrity: 2,
    Good: 1,
    Bad: 0,
    Empty: -1
};

Constants.ShopItemState = {
    Locked: 0,
    Owned: 1,
    Equipped: 2
};

Constants.ShopItemUnlockType = {
    Purchase: 0,
    RandomUnlock: 1,
    Rewarded: 2
};


Constants.SkinType = {
    ReplaceMaterials: 0,
    ExternalTemplate: 1
};

Constants.ShopModelCategory = {
    Basic: 0,
    Star: 1,
    Premium: 2,
    Angels: 3
};

Constants.City = {
    NewYork: "NewYork",
    Milan: "Milan",
    Paris: "Paris",
    London: "London",
    Rome: "Rome",
    Tokyo: "Tokyo",
    Moscow: "Moscow",
    Barcelona: "Barcelona",
    Cairo: "Cairo",
    Amsterdam: "Amsterdam",
    Shanghai: "Shanghai",
    Athens: "Athens",
    Guatemala: "Guatemala"
};

Constants.CityNamesMapping = {
    "NewYork": "NEW YORK",
    "Milan": "MILAN",
    "Paris": "PARIS",
    "London": "LONDON",
    "Rome": "ROME",
    "Tokyo": "TOKYO",
    "Moscow": "MOSCOW",
    "Barcelona": "BARCELONA",
    "Cairo": "CAIRO",
    "Amsterdam": "AMSTERDAM",
    "Shanghai": "SHANGHAI",
    "Athens": "ATHENS",
    "Guatemala": "GUATEMALA"
}

Constants.Concepts = {
    NightClub: "NightClub",
    Sport: "Sport",
    Gala: "Gala",
    Formal: "Formal",
    Date: "Date",
    Beach: "Beach",
    Eighties: "Eighties",
    PyjamaParty: "PyjamaParty",
    Bohemian: "Bohemian",
    School: "School",
    Winter: "Winter",
    Masculine: "Masculine",
    Spring: "Spring",
    Fifties: "Fifties",
    Teen: "Teen",
    Christmas: "Christmas",
    Western: "Western",
    Cyberpunk: "Cyberpunk",
    Halloween: "Halloween",
    Festival: "Festival",

    // --- IAP
    Warrior: "Warrior",
    Tribal: "Tribal",
    Kpop: "Kpop",
    Gothic: "Gothic",
    Hiphop: "Hiphop",
    UpperClass: "UpperClass",
    Military: "Military",
    Cosplay: "Cosplay",
    Princess: "Princess",

    // --- ExpertConceptOfferUi
    FlowerFairy: "FlowerFairy",
    NatureFairy: "NatureFairy",
    Foodie: "Foodie",
    FruitStyle: "FruitStyle",
    Centaurs: "Centaurs",
    Animals: "Animals",
    Sailor: "Sailor",
    Doll: "Doll",
    Parisian: "Parisian",
    Greek: "Greek",

    // --- IAP Expansion V2
    Prom: "Prom",
    Futuristic: "Futuristic",
    Astrology: "Astrology",
    Jeans: "Jeans",
    Pirate: "Pirate",
    FairyTales: "FairyTales",
    Fall: "Fall",
    BlackLace: "BlackLace",
    Circus: "Circus",

    //Chest
    AvantGarde: "AvantGarde",
    Bridal: "Bridal",
    FarEast: "FarEast",
    Fighter: "Fighter",
    Glitter: "Glitter",
    Hawaiian: "Hawaiian",
    Latino: "Latino",
    Mermaid: "Mermaid",
    OfficeLife: "OfficeLife",
    PinkShowGirl: "PinkShowGirl",
    RockAndRoll: "RockAndRoll",
    SpaceLife: "SpaceLife",

    // coming soon
    FashionWeek: "FashionWeek",
    Viking: "Viking",
    OldMoney: "OldMoney"
}


Constants.ConceptNamesMapping = {
    "NightClub": "Night Club",
    "Eighties": "80's",
    "PyjamaParty": "Pyjama Party",
    "Fifties": "50's",
    "UpperClass": "UPPERCLASS",



    // --- ExpertConceptOfferUi
    "FlowerFairy": "FLOWER FAIRY",
    "NatureFairy": "NATURE FAIRY",
    "FruitStyle": "FRUIT STYLE",

    // --- IAP Expansion V2
    "FairyTales": "FAIRY TALES",
    "BlackLace": "BLACK LACE",
    "AvantGarde": "AVANT GARDE",
    "OfficeLife": "OFFICE LIFE",
    "PinkShowGirl": "PINK SHOW GIRL",
    "RockAndRoll": "ROCK AND ROLL",
    "SpaceLife": "SPACE LIFE",
    "FashionWeek": "FASHION WEEK",
    "OldMoney": "OLD MONEY",

    // --- Chest
    "AvantGarde": "AVANT GARDE",
    "FarEast": "FAR EAST"


}

// gameConfig.js
var GameConfig = pc.createScript('gameConfig');

GameConfig.EASINGS = [
    { "Linear": "Linear" },
    { "QuadraticIn": "QuadraticIn" },
    { "QuadraticOut": "QuadraticOut" },
    { "QuadraticInOut": "QuadraticInOut" },
    { "CubicIn": "CubicIn" },
    { "CubicOut": "CubicOut" },
    { "CubicInOut": "CubicInOut" },
    { "QuarticIn": "QuarticIn" },
    { "QuarticOut": "QuarticOut" },
    { "QuarticInOut": "QuarticInOut" },
    { "QuinticIn": "QuinticIn" },
    { "QuinticOut": "QuinticOut" },
    { "QuinticInOut": "QuinticInOut" },
    { "SineIn": "SineIn" },
    { "SineOut": "SineOut" },
    { "SineInOut": "SineInOut" },
    { "ExponentialIn": "ExponentialIn" },
    { "ExponentialOut": "ExponentialOut" },
    { "ExponentialInOut": "ExponentialInOut" },
    { "CircularIn": "CircularIn" },
    { "CircularOut": "CircularOut" },
    { "CircularInOut": "CircularInOut" },
    { "BackIn": "BackIn" },
    { "BackOut": "BackOut" },
    { "BackInOut": "BackInOut" },
    { "BounceIn": "BounceIn" },
    { "BounceOut": "BounceOut" },
    { "BounceInOut": "BounceInOut" },
    { "ElasticIn": "ElasticIn" },
    { "ElasticOut": "ElasticOut" },
    { "ElasticInOut": "ElasticInOut" }
];


GameConfig.attributes.add('gameplay', {
    type: 'json',
    schema: [{
        name: 'initialLikeLevelUpgradePrice',
        type: 'number',
        default: 20
    }, {
        name: 'initialGemsLevelUpgradePrice',
        type: 'number',
        default: 25
    }, {
        name: 'likesLevelPriceIncrement',
        type: 'number',
        default: 1
    }, {
        name: 'gemsLevelPriceIncrement',
        type: 'number',
        default: 1
    }, {
        name: 'likesPerSecondInitial',
        type: 'number',
        default: 1
    }, {
        name: 'likesPerSecondPerUpgradeLevel',
        type: 'number',
        default: 0.3
    }, {
        name: 'likesPerSelectionInitial',
        type: 'number',
        default: 10
    }, {
        name: 'likesPerSelectionPerUpgradeLevel',
        type: 'number',
        default: 3
    }, {
        name: 'gesRewardInitial',
        type: 'number',
        default: 100
    }, {
        name: 'gesRewardPerUpgradeLevel',
        type: 'number',
        default: 6
    },
    {
        name: 'chapterPriceIncrementPerLevel',
        type: 'number',
        default: 250
    },
    ]
});


GameConfig.attributes.add('concepts', {
    type: 'json',
    schema: [{
        name: 'extraConceptAfterEachXLevels',
        title: 'New concept after each X victories',
        type: 'number',
        default: 2
    }]
});


GameConfig.attributes.add('UI', {
    type: 'json',
    schema: [{
        name: 'limitRewardedAdsPerLevel',
        type: 'number',
        default: 0
    },{
        name: 'limitRewardedAdsKeys',
        type: 'string',
        array: true
    },{
        name: 'enableSettingsMenu',
        type: 'boolean',
        default: true
    }, {
        name: 'enableVibration',
        type: 'boolean',
        default: true
    }]
});


GameConfig.attributes.add('shop', {
    type: 'json',
    schema: [{
        name: 'basePriceModelsStar',
        type: 'number',
        default: 500
    }, {
        name: 'priceIncrementModelsStar',
        type: 'number',
        default: 500
    },{
        name: 'basePriceFinishersBasic',
        type: 'number',
        default: 500
    }, {
        name: 'priceIncrementFinishersBasic',
        type: 'number',
        default: 500
    },]
});

GameConfig.attributes.add('AI', {
    type: 'json',
    schema: [{
        name: 'guarranteedVictoryEveryMatches',
        type: 'vec2',
        default: [4, 6]
    },{
        name: 'maxErrorChance',
        type: 'number',
        default: 0.6
    },{
        name: 'minErrorChance',
        type: 'number',
        default: 0
    }, {
        name: 'opponentScoreMultiplierMin',
        type: 'number',
        default: 0.8
    },  {
        name: 'opponentScoreMultiplierMax',
        type: 'number',
        default: 1.1
    }]
});

GameConfig.attributes.add('debug', {
    type: 'json',
    schema: [{
        name: 'rewardedLocalTestingMode',
        title: 'Rewarded Local Test Mode',
        type: 'string',
        enum: [{
            "none": "none"
        }, {
            "disabled": "disabled"
        }, {
            "present": "present"
        }, {
            "unavailable": "unavailable"
        }],
        default: 'none'
    },
    {
        name: 'overlay',
        type: 'boolean',
        default: false
    },  {
        name: 'consoleMessages',
        title: 'Console Output',
        type: 'boolean',
        default: false
    }, {
        name: 'unlockAllShopItems',
        title: 'Unlock All Shop Items',
        type: 'boolean',
        default: false
    }, {
        name: 'goldBonus',
        type: 'number',
        default: 0
    }, {
        name: 'physics',
        type: 'boolean',
        default: false
    }, {
        name: 'hotkeys',
        type: 'boolean',
        default: false
    }]
});



/* Global methods */

GameConfig.prototype.initialize = function () {
    GameConfig.app = this.app;
    GameConfig.instance = this;

    if (GameConfig.getAttribute('debug', 'rewardedLocalTestingMode') !== 'none') {
        console.error('Rewarded videos 🎞️ are in debug mode!');
    }
};

GameConfig.getAttribute = function (category, key) {
    if (!category) {
        console.warn('GameConfig.getAttribute: invalid category param ', category);
        return null;
    }
    if (GameConfig.instance[category] === undefined) {
        console.warn('GameConfig doesn\'t contain  category  ' + category);
        return null;
    } else {
        if (key !== undefined) {
            if (GameConfig.instance[category][key] === undefined) {
                console.warn('GameConfig doesn\'t contain key  ' + category + " > " + key);
                return null;
            } else {
                return GameConfig.instance[category][key];
            }
        } else {
            return GameConfig.instance[category];
        }
    }
};

GameConfig.setAttribute = function (category, key, value) {
    if (GameConfig.instance[category] === undefined) {
        console.warn('GameConfig.setAttribute: invalid category  ' + category);
        return;
    } else if (GameConfig.instance[category][key] === undefined) {
        console.warn('GameConfig.setAttribute: invalid key  ' + category + " > " + key);
        return;
    } else {
        GameConfig.instance[category][key] = value;
    }
};

// tween.js
pc.extend(pc, function () {

    /**
     * @name pc.TweenManager
     * @description Handles updating tweens
     * @param {pc.AppBase} app - The AppBase instance.
     */
    var TweenManager = function (app) {
        this._app = app;
        this._tweens = [];
        this._add = []; // to be added
    };

    TweenManager.prototype = {
        add: function (tween) {
            this._add.push(tween);
            return tween;
        },

        update: function (dt) {
            var i = 0;
            var n = this._tweens.length;
            while (i < n) {
                if (this._tweens[i].update(dt)) {
                    i++;
                } else {
                    this._tweens.splice(i, 1);
                    n--;
                }
            }

            // add any tweens that were added mid-update
            if (this._add.length) {
                for (let i = 0; i < this._add.length; i++) {
                    if (this._tweens.indexOf(this._add[i]) > -1) continue;
                    this._tweens.push(this._add[i]);
                }
                this._add.length = 0;
            }
        }
    };

    /**
     * @name  pc.Tween
     * @param {object} target - The target property that will be tweened
     * @param {pc.TweenManager} manager - The tween manager
     * @param {pc.Entity} entity - The pc.Entity whose property we are tweening
     */
    var Tween = function (target, manager, entity) {
        pc.events.attach(this);

        this.manager = manager;

        if (entity) {
            this.entity = null; // if present the tween will dirty the transforms after modify the target
        }

        this.time = 0;

        this.complete = false;
        this.playing = false;
        this.stopped = true;
        this.pending = false;

        this.target = target;

        this.duration = 0;
        this._currentDelay = 0;
        this.timeScale = 1;
        this._reverse = false;

        this._delay = 0;
        this._yoyo = false;

        this._count = 0;
        this._numRepeats = 0;
        this._repeatDelay = 0;

        this._from = false; // indicates a "from" tween

        // for rotation tween
        this._slerp = false; // indicates a rotation tween
        this._fromQuat = new pc.Quat();
        this._toQuat = new pc.Quat();
        this._quat = new pc.Quat();

        this.easing = pc.Linear;

        this._sv = {}; // start values
        this._ev = {}; // end values
    };

    var _parseProperties = function (properties) {
        var _properties;
        if (properties instanceof pc.Vec2) {
            _properties = {
                x: properties.x,
                y: properties.y
            };
        } else if (properties instanceof pc.Vec3) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z
            };
        } else if (properties instanceof pc.Vec4) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z,
                w: properties.w
            };
        } else if (properties instanceof pc.Quat) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z,
                w: properties.w
            };
        } else if (properties instanceof pc.Color) {
            _properties = {
                r: properties.r,
                g: properties.g,
                b: properties.b
            };
            if (properties.a !== undefined) {
                _properties.a = properties.a;
            }
        } else {
            _properties = properties;
        }
        return _properties;
    };
    Tween.prototype = {
        // properties - js obj of values to update in target
        to: function (properties, duration, easing, delay, repeat, yoyo) {
            this._properties = _parseProperties(properties);
            this.duration = duration;

            if (easing) this.easing = easing;
            if (delay) {
                this.delay(delay);
            }
            if (repeat) {
                this.repeat(repeat);
            }

            if (yoyo) {
                this.yoyo(yoyo);
            }

            return this;
        },

        from: function (properties, duration, easing, delay, repeat, yoyo) {
            this._properties = _parseProperties(properties);
            this.duration = duration;

            if (easing) this.easing = easing;
            if (delay) {
                this.delay(delay);
            }
            if (repeat) {
                this.repeat(repeat);
            }

            if (yoyo) {
                this.yoyo(yoyo);
            }

            this._from = true;

            return this;
        },

        rotate: function (properties, duration, easing, delay, repeat, yoyo) {
            this._properties = _parseProperties(properties);

            this.duration = duration;

            if (easing) this.easing = easing;
            if (delay) {
                this.delay(delay);
            }
            if (repeat) {
                this.repeat(repeat);
            }

            if (yoyo) {
                this.yoyo(yoyo);
            }

            this._slerp = true;

            return this;
        },

        start: function () {
            var prop, _x, _y, _z;

            this.playing = true;
            this.complete = false;
            this.stopped = false;
            this._count = 0;
            this.pending = (this._delay > 0);

            if (this._reverse && !this.pending) {
                this.time = this.duration;
            } else {
                this.time = 0;
            }

            if (this._from) {
                for (prop in this._properties) {
                    if (this._properties.hasOwnProperty(prop)) {
                        this._sv[prop] = this._properties[prop];
                        this._ev[prop] = this.target[prop];
                    }
                }

                if (this._slerp) {
                    this._toQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z);

                    _x = this._properties.x !== undefined ? this._properties.x : this.target.x;
                    _y = this._properties.y !== undefined ? this._properties.y : this.target.y;
                    _z = this._properties.z !== undefined ? this._properties.z : this.target.z;
                    this._fromQuat.setFromEulerAngles(_x, _y, _z);
                }
            } else {
                for (prop in this._properties) {
                    if (this._properties.hasOwnProperty(prop)) {
                        this._sv[prop] = this.target[prop];
                        this._ev[prop] = this._properties[prop];
                    }
                }

                if (this._slerp) {
                    _x = this._properties.x !== undefined ? this._properties.x : this.target.x;
                    _y = this._properties.y !== undefined ? this._properties.y : this.target.y;
                    _z = this._properties.z !== undefined ? this._properties.z : this.target.z;

                    if (this._properties.w !== undefined) {
                        this._fromQuat.copy(this.target);
                        this._toQuat.set(_x, _y, _z, this._properties.w);
                    } else {
                        this._fromQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z);
                        this._toQuat.setFromEulerAngles(_x, _y, _z);
                    }
                }
            }

            // set delay
            this._currentDelay = this._delay;

            // add to manager when started
            this.manager.add(this);

            this.fire("start");

            return this;
        },

        pause: function () {
            this.playing = false;
        },

        resume: function () {
            this.playing = true;
        },

        stop: function () {
            this.playing = false;
            this.stopped = true;
        },

        delay: function (delay) {
            this._delay = delay;
            this.pending = true;

            return this;
        },

        repeat: function (num, delay) {
            this._count = 0;
            this._numRepeats = num;
            if (delay) {
                this._repeatDelay = delay;
            } else {
                this._repeatDelay = 0;
            }

            return this;
        },

        loop: function (loop) {
            if (loop) {
                this._count = 0;
                this._numRepeats = Infinity;
            } else {
                this._numRepeats = 0;
            }

            return this;
        },

        yoyo: function (yoyo) {
            this._yoyo = yoyo;
            return this;
        },

        reverse: function () {
            this._reverse = !this._reverse;

            return this;
        },

        chain: function () {
            var n = arguments.length;

            while (n--) {
                if (n > 0) {
                    arguments[n - 1]._chained = arguments[n];
                } else {
                    this._chained = arguments[n];
                }
            }

            return this;
        },

        onStart: function (callback) {
            this.on('start', callback);
            return this;
        },

        onUpdate: function (callback) {
            this.on('update', callback);
            return this;
        },

        onComplete: function (callback) {
            this.on('complete', callback);
            return this;
        },

        onLoop: function (callback) {
            this.on('loop', callback);
            return this;
        },

        update: function (dt) {
            if (this.stopped) return false;

            if (!this.playing) return true;

            if (!this._reverse || this.pending) {
                this.time += dt * this.timeScale;
            } else {
                this.time -= dt * this.timeScale;
            }

            // delay start if required
            if (this.pending) {
                if (this.time > this._currentDelay) {
                    if (this._reverse) {
                        this.time = this.duration - (this.time - this._currentDelay);
                    } else {
                        this.time -= this._currentDelay;
                    }
                    this.pending = false;
                } else {
                    return true;
                }
            }

            var _extra = 0;
            if ((!this._reverse && this.time > this.duration) || (this._reverse && this.time < 0)) {
                this._count++;
                this.complete = true;
                this.playing = false;
                if (this._reverse) {
                    _extra = this.duration - this.time;
                    this.time = 0;
                } else {
                    _extra = this.time - this.duration;
                    this.time = this.duration;
                }
            }

            var elapsed = (this.duration === 0) ? 1 : (this.time / this.duration);

            // run easing
            var a = this.easing(elapsed);

            // increment property
            var s, e;
            for (var prop in this._properties) {
                if (this._properties.hasOwnProperty(prop)) {
                    s = this._sv[prop];
                    e = this._ev[prop];
                    this.target[prop] = s + (e - s) * a;
                }
            }

            if (this._slerp) {
                this._quat.slerp(this._fromQuat, this._toQuat, a);
            }

            // if this is a entity property then we should dirty the transform
            if (this.entity) {
                this.entity._dirtifyLocal();

                // apply element property changes
                if (this.element && this.entity.element) {
                    this.entity.element[this.element] = this.target;
                }

                if (this._slerp) {
                    this.entity.setLocalRotation(this._quat);
                }
            }

            this.fire("update", dt);

            if (this.complete) {
                var repeat = this._repeat(_extra);
                if (!repeat) {
                    this.fire("complete", _extra);
                    if (this.entity)
                        this.entity.off('destroy', this.stop, this);
                    if (this._chained) this._chained.start();
                } else {
                    this.fire("loop");
                }

                return repeat;
            }

            return true;
        },

        _repeat: function (extra) {
            // test for repeat conditions
            if (this._count < this._numRepeats) {
                // do a repeat
                if (this._reverse) {
                    this.time = this.duration - extra;
                } else {
                    this.time = extra; // include overspill time
                }
                this.complete = false;
                this.playing = true;

                this._currentDelay = this._repeatDelay;
                this.pending = true;

                if (this._yoyo) {
                    // swap start/end properties
                    for (var prop in this._properties) {
                        var tmp = this._sv[prop];
                        this._sv[prop] = this._ev[prop];
                        this._ev[prop] = tmp;
                    }

                    if (this._slerp) {
                        this._quat.copy(this._fromQuat);
                        this._fromQuat.copy(this._toQuat);
                        this._toQuat.copy(this._quat);
                    }
                }

                return true;
            }
            return false;
        }

    };


    /**
     * Easing methods
     */

    var Linear = function (k) {
        return k;
    };

    var QuadraticIn = function (k) {
        return k * k;
    };

    var QuadraticOut = function (k) {
        return k * (2 - k);
    };

    var QuadraticInOut = function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
    };

    var CubicIn = function (k) {
        return k * k * k;
    };

    var CubicOut = function (k) {
        return --k * k * k + 1;
    };

    var CubicInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k;
        return 0.5 * ((k -= 2) * k * k + 2);
    };

    var QuarticIn = function (k) {
        return k * k * k * k;
    };

    var QuarticOut = function (k) {
        return 1 - (--k * k * k * k);
    };

    var QuarticInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k * k;
        return -0.5 * ((k -= 2) * k * k * k - 2);
    };

    var QuinticIn = function (k) {
        return k * k * k * k * k;
    };

    var QuinticOut = function (k) {
        return --k * k * k * k * k + 1;
    };

    var QuinticInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    };

    var SineIn = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return 1 - Math.cos(k * Math.PI / 2);
    };

    var SineOut = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return Math.sin(k * Math.PI / 2);
    };

    var SineInOut = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return 0.5 * (1 - Math.cos(Math.PI * k));
    };

    var ExponentialIn = function (k) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    };

    var ExponentialOut = function (k) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    };

    var ExponentialInOut = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    };

    var CircularIn = function (k) {
        return 1 - Math.sqrt(1 - k * k);
    };

    var CircularOut = function (k) {
        return Math.sqrt(1 - (--k * k));
    };

    var CircularInOut = function (k) {
        if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    };

    var ElasticIn = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;
        if (!a || a < 1) {
            a = 1; s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
        return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    };

    var ElasticOut = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;
        if (!a || a < 1) {
            a = 1; s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
        return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
    };

    var ElasticInOut = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;
        if (!a || a < 1) {
            a = 1; s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
        if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    };

    var BackIn = function (k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    };

    var BackOut = function (k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    };

    var BackInOut = function (k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    };

    var BounceOut = function (k) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        } else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        } else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        }
        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;

    };

    var BounceIn = function (k) {
        return 1 - BounceOut(1 - k);
    };

    var BounceInOut = function (k) {
        if (k < 0.5) return BounceIn(k * 2) * 0.5;
        return BounceOut(k * 2 - 1) * 0.5 + 0.5;
    };

    return {
        TweenManager: TweenManager,
        Tween: Tween,
        Linear: Linear,
        QuadraticIn: QuadraticIn,
        QuadraticOut: QuadraticOut,
        QuadraticInOut: QuadraticInOut,
        CubicIn: CubicIn,
        CubicOut: CubicOut,
        CubicInOut: CubicInOut,
        QuarticIn: QuarticIn,
        QuarticOut: QuarticOut,
        QuarticInOut: QuarticInOut,
        QuinticIn: QuinticIn,
        QuinticOut: QuinticOut,
        QuinticInOut: QuinticInOut,
        SineIn: SineIn,
        SineOut: SineOut,
        SineInOut: SineInOut,
        ExponentialIn: ExponentialIn,
        ExponentialOut: ExponentialOut,
        ExponentialInOut: ExponentialInOut,
        CircularIn: CircularIn,
        CircularOut: CircularOut,
        CircularInOut: CircularInOut,
        BackIn: BackIn,
        BackOut: BackOut,
        BackInOut: BackInOut,
        BounceIn: BounceIn,
        BounceOut: BounceOut,
        BounceInOut: BounceInOut,
        ElasticIn: ElasticIn,
        ElasticOut: ElasticOut,
        ElasticInOut: ElasticInOut
    };
}());

// Expose prototype methods and create a default tween manager on the AppBase
(function () {
    // Add pc.AppBase#addTweenManager method
    pc.AppBase.prototype.addTweenManager = function () {
        this._tweenManager = new pc.TweenManager(this);

        this.on("update", function (dt) {
            this._tweenManager.update(dt);
        });
    };

    pc.AppBase.prototype.stopAllTweens = function (target) {
        for (var i = this._tweenManager._tweens.length - 1; i > -1; i--) {
            if (this._tweenManager._tweens[i].entity === target) {
                this._tweenManager._tweens[i].stop();
            }
        }
    };

    // Add pc.AppBase#tween method
    pc.AppBase.prototype.tween = function (target) {
        return new pc.Tween(target, this._tweenManager);
    };

    // Add pc.Entity#tween method
    pc.Entity.prototype.tween = function (target, options) {
        var tween = this._app.tween(target);
        tween.entity = this;

        this.once('destroy', tween.stop, tween);

        if (options && options.element) {
            // specifiy a element property to be updated
            tween.element = options.element;
        }
        return tween;
    };

    // Create a default tween manager on the AppBase
    var AppBase = pc.AppBase.getApplication();
    if (AppBase) {
        AppBase.addTweenManager();
    }
})();   

// UIController.js
/* jshint esversion: 9 */
var UIController = pc.createScript('uicontroller');

UIController.attributes.add('initialWindow', {
    type: 'entity'
});

UIController.attributes.add('initialPopups', {
    type: 'entity',
    array: true
});

UIController.attributes.add('autoEnableOnStart', {
    type: 'boolean',
    default: false
});

UIController.getInstance = function () {
    if (!UIController._instance) console.error('UIController is not initialized yet');
    return UIController._instance;
};

UIController.prototype.initialize = function () {
    UIController._app = this.app;
    if (!UIController._instance) {
        UIController._instance = this;
    }

    /* scale blend listener */
    this.app.on(EventTypes.Screen.SET_SCALE_BLEND, this.setScaleBlend, this);

    /* auto-enable */
    if (this.autoEnableOnStart) {
        this._initializeWindows();
        this._autoInitializeElements();
    }

    /* screen hide waiters */
    this._screenHideWaiters = new Map();

    /* enable screen blocker */
    const screenBlocker = this.entity.findByName('ScreenBlocker');
    screenBlocker.enabled = true;

};


UIController.prototype.postInitialize = function () {
    this.hideAllImmediately();

    const showInitialWindows = () => {
        if (this.initialWindow) {
            this.showWindow(this.initialWindow.name);
        }

        if (this.initialPopups) {
            this.initialPopups.forEach(popup => {
                if (popup) this.showPopup(popup.name);
            });
        }
    };

    this.on('attr:initialWindow', showInitialWindows);
    this.on('attr:initialPopups', showInitialWindows);

    showInitialWindows();
};





UIController.prototype.update = function (dt) {

};

UIController.prototype._initializeWindows = function () {
    this.entity.children.forEach(child => {
        if (child.tags.has('ui-window')) {
            if (child.enabled) {
                console.error("Please disable UI '" + child.name + "'!");
            } else {
                child.enabled = true;
            }
            child.enabled = false;
        } else if (!child.tags.has('common-ui')) {
            console.log("[Note] UI location " + child.name + " should probably have a 'ui-window' tag in order to be properly initialized");
        }
    });
};

UIController.prototype._autoInitializeElements = function () {
    this.entity.children.forEach(child => {
        if (child.tags.has('auto-initialize')) {
            if (!child.enabled) {
                child.enabled = true;
            }
        }
    });
};



UIController.prototype.showWindow = function (windowName, hideOthers = true, windowToOpenOnExit = null) {
    const windowEntity = this.entity.children.find(window => window.name === windowName);
    if (!windowEntity) console.warn('Attempt to display non-existent screen: ' + windowName);
    if (hideOthers) {
        this.hideAll(windowEntity).then(() => {
            if (windowEntity) {
                this._showWindow(windowEntity, windowToOpenOnExit);
            }
        });
    } else {
        if (windowEntity) {
            this._showWindow(windowEntity, windowToOpenOnExit);
        }
    }
};


UIController.prototype.showPopup = function (popupName) {
    const popupEntity = this.entity.children.find(p => p.name === popupName);
    if (popupEntity) {
        this._showWindow(popupEntity);
    }
};

UIController.prototype.hide = function (elementName, immediately = false) {
    return new Promise((resolve, reject) => {
        const windowEntity = this.entity.children.find(p => p.name === elementName);
        if (windowEntity) {
            this._hideWindow(windowEntity, immediately).then(() => resolve());
        } else {
            resolve();
        }
    })
};

UIController.prototype.showWindowOverTransition = function (windowName, options) {
    options = options || {};
    const windowEntity = this.entity.children.find(window => window.name === windowName);
    const hideOthers = options.hideOthers !== undefined ? options.hideOthers : true;
    const windowToOpenOnExit = options.windowToOpenOnExit !== undefined ? options.windowToOpenOnExit : null;
    const fadeInDuration = options.fadeInDuration !== undefined ? options.fadeInDuration : 0.175;
    const fadeOutDuration = options.fadeOutDuration !== undefined ? options.fadeOutDuration : 0.35;
    const callback = options.callback !== undefined ? options.callback : undefined;

    this.app.fire(EventTypes.SHOW_TRANSITION_SCREEN, fadeInDuration, () => {

        if (hideOthers) {
            this.hideAllImmediately(windowEntity).then(() => {
                if (windowEntity) {
                    this._showWindow(windowEntity, windowToOpenOnExit);
                }
            });
        } else {
            if (windowEntity) {
                this._showWindow(windowEntity, windowToOpenOnExit);
            }
        }

        if (callback) callback();

        this.app.fire(EventTypes.HIDE_TRANSITION_SCREEN, fadeOutDuration);
    });
};



UIController.prototype.transition = function (options) {
    options = options || {};
    const fadeInDuration = options.fadeInDuration !== undefined ? options.fadeInDuration : 0.15;
    const fadeOutDuration = options.fadeOutDuration !== undefined ? options.fadeOutDuration : 0.25;
    const callback = options.callback !== undefined ? options.callback : undefined;

    this.app.fire(EventTypes.SHOW_TRANSITION_SCREEN, fadeInDuration, () => {
        if (callback) callback();
        this.app.fire(EventTypes.HIDE_TRANSITION_SCREEN, fadeOutDuration);
    });
};



UIController.prototype.showWindowImmediately = function (windowName, hideOthers = true, windowToOpenOnExit = null) {
    const windowEntity = this.entity.children.find(window => window.name === windowName);
    if (hideOthers) this.hideAll(windowEntity);
    if (windowEntity) {
        this._showWindow(windowEntity, windowToOpenOnExit);
    }
};


UIController.prototype.hideAll = async function (...skipWindows) {
    const windowToHidePromises = this.entity.children.filter(windowEntity => windowEntity.tags.has('ui-window') && skipWindows.indexOf(windowEntity) === -1)
        .map(windowEntity => this._hideWindow(windowEntity));

    return await Promise.all(windowToHidePromises);
};

UIController.prototype.hideAllImmediately = async function (...skipWindows) {
    const windowToHidePromises = this.entity.children.filter(windowEntity => windowEntity.tags.has('ui-window') && skipWindows.indexOf(windowEntity) === -1)
        .map(windowEntity => this._hideWindow(windowEntity, true));

    return await Promise.all(windowToHidePromises);
};


UIController.prototype._showWindow = async function (windowEntity, windowToOpenOnExit = null) {
    if (windowEntity.show && typeof windowEntity.show === 'function') {
        return windowEntity.show(windowToOpenOnExit);
    } else {
        windowEntity.enabled = true;
        return true;
    }
};


UIController.prototype._hideWindow = async function (windowEntity, immediately = false) {
    if (windowEntity.hide && typeof windowEntity.hide === 'function') {
        return windowEntity.hide(immediately);
    } else {
        return new Promise((resolve, reject) => {
            windowEntity.enabled = false;
            resolve();
        });
    }
};

UIController.prototype.dispatchWindowShown = function (windowName) {
    this.app.fire(EventTypes.GUI.SCREEN_SHOWN, windowName);
};

UIController.prototype.dispatchWindowHidden = function (windowName) {
    const waitersList = this._screenHideWaiters.get(windowName);
    if(waitersList && waitersList.length > 0) {
        while(waitersList.length > 0) {
            const waiterCallback = waitersList.pop();
            waiterCallback(windowName);
        }
    }

    this.app.fire(EventTypes.GUI.SCREEN_HIDDEN, windowName);
};

UIController.prototype.waitWhenScreenHidden = function (screenName) {
    return new Promise((resolve, reject) => {
        if (!this._screenHideWaiters.has(screenName)) this._screenHideWaiters.set(screenName, []);
        const waitersList = this._screenHideWaiters.get(screenName);
        waitersList.push((_name) => resolve(_name));            
    });
};

UIController.prototype.getWindow = function (windowName) {
    return this.entity.children.find(window => window.name === windowName);
};


UIController.prototype.getScreenResolution = function () {
    return this.entity.screen.resolution;
};

UIController.prototype.getScreenReferenceResolution = function () {
    return this.entity.screen.referenceResolution;
};

UIController.prototype.getScreenScale = function () {
    return this.entity.screen.scale;
};

UIController.prototype.getScreenWidth = function () {
    return this.entity.screen.resolution.x / this.entity.screen.scale;
};


UIController.prototype.getScreenHeight = function () {
    return this.entity.screen.resolution.y / this.entity.screen.scale;
};

UIController.prototype.getScaleBlend = function () {
    return this.entity.screen.scaleBlend;
};

UIController.prototype.setScaleBlend = function (scaleBlend) {
    this.entity.screen.scaleBlend = scaleBlend;
};


UIController.prototype.worldToScreen = function (worldPosition) {
    this._screenPos = this._screenPos || new pc.Vec3();
    CameraController.getInstance().getActiveCamera().camera.worldToScreen(worldPosition, this._screenPos);

    // Take into account of pixel ratio
    const pixelRatio = this.app.graphicsDevice.maxPixelRatio;
    this._screenPos.x *= pixelRatio;
    this._screenPos.y *= pixelRatio;

    const device = this.app.graphicsDevice;

    // Global position of elements is normalised between -1 and 1 on both axis
    return new pc.Vec3(
        ((this._screenPos.x / device.width) * 2) - 1,
        ((1 - (this._screenPos.y / device.height)) * 2) - 1,
        0);
};

// inputController.js
/* jshint esversion: 6 */
var InputController = pc.createScript('inputController');

InputController.tapDistanceTolerance = 1;
InputController.clickDistanceTolerance = 1;
InputController.inputPosition = null;

InputController.attributes.add('listenToSwipes', {
    type: 'boolean',
    default: true
});

InputController.attributes.add('minSwipeDistance', {
    type: 'number',
    default: 75
});


InputController.getInstance = function () {
    if (!InputController._instance) console.error('InputController is not initialized yet');
    return InputController._instance;
};


InputController.prototype.initialize = function () {
    InputController._app = this.app;
    if (!InputController._instance) {
        InputController._instance = this;
    }

    const mouseSupported = !!this.app.mouse;
    const touchSupported = !!this.app.touch;

    if (touchSupported) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this);

        this.app.touch.on(pc.EVENT_TOUCHEND, function (event) {
            // This prevents that a mouse click event will be executed after a touch event.
            event.event.preventDefault();
        });
    }

    if (mouseSupported) {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    }

    if (this.app.keyboard) {
        this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }

    if (this.app.mouse) {
        this.app.mouse.disableContextMenu();
        this.app.mouse.on(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);
    }

    this.on("destroy", this.destroy, this);
};

InputController.prototype.update = function (dt) {

};

InputController.prototype.postUpdate = function (dt) {
   
};

InputController.prototype.onTouchStart = function (event) {
    if (event.touches.length >= 1) {
        this.touchDownPosition = { id: event.touches[0].id, x: event.touches[0].x, y: event.touches[0].y };
        InputController.inputPosition = { x: event.touches[0].x, y: event.touches[0].y, traveledDistance: 0 };
        this.app.fire(EventTypes.INPUT_DOWN, event.touches[0].x, event.touches[0].y, event.touches[0].x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.touches[0].y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    }
};

InputController.prototype.onTouchMove = function (event) {
    if (event.changedTouches && event.changedTouches[0]) {
        if (InputController.inputPosition) {
            InputController.inputPosition.traveledDistance += Utils.distanceBetween(InputController.inputPosition.x || 0, InputController.inputPosition.y || 0, event.changedTouches[0].x, event.changedTouches[0].y);
            InputController.inputPosition.x = event.changedTouches[0].x;
            InputController.inputPosition.y = event.changedTouches[0].y;
        } else {
            InputController.inputPosition = { x: event.changedTouches[0].x, y: event.changedTouches[0].y, traveledDistance: 0 };
        }

        if(this.touchDownPosition) {
            const touchDistance =  Utils.distanceBetween(this.touchDownPosition.x, this.touchDownPosition.y, event.changedTouches[0].x, event.changedTouches[0].y) * (window.devicePixelRatio || 1) * 1.25;
            if(this.listenToSwipes && touchDistance >= this.minSwipeDistance) {
                let dx = event.changedTouches[0].x - this.touchDownPosition.x;
                let dy =  event.changedTouches[0].y - this.touchDownPosition.y;

                if(Math.abs(dx) / Math.abs(dy || 1) > 1.8) {
                    this.app.fire((dx > 0) ? EventTypes.SWIPE_RIGHT : EventTypes.SWIPE_LEFT);
                    this.touchDownPosition = null;
                    InputController.inputPosition = null;
                } else if(Math.abs(dy) / Math.abs(dx || 1) > 1.8) {
                    this.app.fire((dy > 0) ? EventTypes.SWIPE_DOWN : EventTypes.SWIPE_UP);
                    this.touchDownPosition = null;
                    InputController.inputPosition = null;
                }
            }
        }

        this.app.fire(EventTypes.GameInput.TOUCH_MOVE, event.changedTouches[0].x, event.changedTouches[0].y);
        this.app.fire(EventTypes.INPUT_MOVE, event.changedTouches[0].x, event.changedTouches[0].y,  event.changedTouches[0].x / this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.changedTouches[0].y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    }
};


InputController.prototype.onTouchEnd = function (event) {
    if (event.changedTouches.length >= 1) {
        if (this.touchDownPosition && InputController.inputPosition && InputController.inputPosition.traveledDistance < InputController.tapDistanceTolerance) {
            if (this.touchDownPosition.id === event.changedTouches[0].id) {
                this.handleTouch(event.changedTouches[0].x, event.changedTouches[0].y);
            }
        }
        this.app.fire(EventTypes.INPUT_UP, event.changedTouches[0].x, event.changedTouches[0].y, event.changedTouches[0].x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.changedTouches[0].y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    }
};


InputController.prototype.onTouchCancel = function (event) {
    this.touchDownPosition = null;
};


InputController.prototype.onKeyDown = function (event) {
    if (pc.platform.desktop) {
        switch (event.key) {
            case pc.KEY_A:
                break;
        }
    }
};


InputController.prototype.onMouseWheel = function (event) {
    event.event.preventDefault();
};


InputController.prototype.onMouseDown = function (event) {
    InputController.inputPosition = { x: event.x, y: event.y, traveledDistance: 0 };
    this.mouseDownPosition = { x: event.x, y: event.y };
    this.app.fire(EventTypes.INPUT_DOWN, event.x, event.y, event.x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    this.app.fire(EventTypes.GameInput.MOUSE_DOWN, event.x, event.y);
};


InputController.prototype.onMouseUp = function (event) {
    this.app.fire(EventTypes.INPUT_UP, event.x, event.y, event.x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    this.app.fire(EventTypes.GameInput.MOUSE_UP, event.x, event.y);

    if (InputController.inputPosition && InputController.inputPosition.traveledDistance < InputController.clickDistanceTolerance) {
        this.handleTouch(event.x, event.y);
    }

    this.mouseDownPosition = null;
    InputController.inputPosition = null;
};


InputController.prototype.onMouseMove = function (event) {
    this.lastMouseX = event.x;
    this.lastMouseY = event.y;
    if (InputController.inputPosition) {
        InputController.inputPosition.traveledDistance += Utils.distanceBetween(InputController.inputPosition.x || 0, InputController.inputPosition.y || 0, event.x, event.y);
        InputController.inputPosition.x = event.x;
        InputController.inputPosition.y = event.y;
        this.app.fire(EventTypes.GameInput.MOUSE_MOVE, event.x, event.y);
        this.app.fire(EventTypes.INPUT_MOVE, event.x, event.y, event.x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    }

    if(this.mouseDownPosition) {
        const mouseDistance =  Utils.distanceBetween(this.mouseDownPosition.x, this.mouseDownPosition.y, event.x, event.y) * (window.devicePixelRatio || 1);

        if(this.listenToSwipes && mouseDistance >= this.minSwipeDistance) {
            let dx = event.x - this.mouseDownPosition.x;
            let dy = event.y - this.mouseDownPosition.y;

            if(Math.abs(dx) / Math.abs(dy || 1) > 1.8) {
                this.app.fire((dx > 0) ? EventTypes.SWIPE_RIGHT : EventTypes.SWIPE_LEFT);
                this.mouseDownPosition = null;
                InputController.inputPosition = null;
            } else if(Math.abs(dy) / Math.abs(dx || 1) > 1.8) {
                this.app.fire((dy > 0) ? EventTypes.SWIPE_DOWN : EventTypes.SWIPE_UP);
                this.mouseDownPosition = null;
                InputController.inputPosition = null;
            }
        }
    }
};


InputController.prototype.handleTouch = function (x, y) {
    this.app.fire(EventTypes.TAP_AT, x, y, x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
};


InputController.prototype.destroy = function () {
    this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
    this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
    this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
    this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this);
    if (this.app.mouse) {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    }
    if (this.app.keyboard) {
        this.app.keyboard.off(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }
};

// DataManager.js
var DataManager = pc.createScript('dataManager');

DataManager.getInstance = function () {
    if (!DataManager._instance) console.error('DataManager is not initialized yet');
    return DataManager._instance;
};

DataManager.prototype.initialize = function () {
    DataManager._app = this.app;
    if (!DataManager._instance) {
        DataManager._instance = this;
    }

    this.app.on(EventTypes.LEVEL_RESET, () => this.resetData(), this);
    this.app.on(EventTypes.SAVEDATA_LOADED, this._loadSavedData, this);

    this._aiVictoryChanceCounter = 0;
    this._aiVictoryIn = 5;

    /* level */
    this._level = 1;
    Object.defineProperty(this, 'level', {
        get: () => this._level,
        set: (value) => {
            this._level = value;
            this.app.fire(EventTypes.LEVEL_CHANGED, this._level);
        }
    });

    /* chapter */
    this._chapter = 1;
    Object.defineProperty(this, 'chapter', {
        get: () => this._chapter,
        set: (value) => {
            this._chapter = value;
            this.app.fire(EventTypes.CHAPTER_CHANGED, this._chapter);
        }
    });

    /* gems */
    this._gems = 0;
    Object.defineProperty(this, 'gems', {
        get: () => this._gems,
        set: (value) => {
            const prevValue = this._gems;
            this._gems = value;
            this.app.fire(EventTypes.GEMS_AMOUNT_CHANGED, this._gems, prevValue);
        }
    });

    /* likes boost */
    this._likesBoostLevel = 1;
    Object.defineProperty(this, 'likesBoostLevel', {
        get: () => this._likesBoostLevel,
        set: (value) => {
            this._likesBoostLevel = value;
            this.app.fire(EventTypes.LIKES_BOOST_LEVEL_CHANGED, this._likesBoostLevel);
        }
    });

    /* gems boost */
    this._gemsBoostLevel = 1;
    Object.defineProperty(this, 'gemsBoostLevel', {
        get: () => this._gemsBoostLevel,
        set: (value) => {
            this._gemsBoostLevel = value;
            this.app.fire(EventTypes.GEMS_BOOST_LEVEL_CHANGED, this._gemsBoostLevel);
        }
    });

    /* last level reward */
    this._lastLevelRewardGems = 0;
    Object.defineProperty(this, 'lastLevelRewardGems', {
        get: () => this._lastLevelRewardGems,
        set: (value) => {
            this._lastLevelRewardGems = value;
        }
    });

    /* player level score */
    this._playerlevelScore = 0;
    Object.defineProperty(this, 'playerlevelScore', {
        get: () => this._playerlevelScore,
        set: (value) => {
            this._playerlevelScore = value;
        }
    });

    /* opponent level score */
    this._opponentLevelScore = 0;
    Object.defineProperty(this, 'opponentLevelScore', {
        get: () => this._opponentLevelScore,
        set: (value) => {
            this._opponentLevelScore = value;
        }
    });


    /* scores */
    this._score = 0;
    Object.defineProperty(this, 'score', {
        get: () => this._score,
        set: (value) => {
            this._score = value;
            this.app.fire(EventTypes.SCORE_CHANGED, this._score);
        }
    });

    /* username */
    this._username = 'You';
    Object.defineProperty(this, 'username', {
        get: () => this._username,
        set: (value) => {
            this._username = value;
            this.app.fire(EventTypes.USERNAME_CHANGED, this._username);
        }
    });


    /* started */
    this._started = false;
    Object.defineProperty(this, 'started', {
        get: () => this._started,
        set: (value) => {
            this._started = value;
        }
    });


    /* finished */
    this._finished = false;
    Object.defineProperty(this, 'finished', {
        get: () => this._finished,
        set: (value) => {
            this._finished = value;
        }
    });

    /* last match result */
    this._lastMatchResultWasVictory = false;
    Object.defineProperty(this, 'lastMatchResultWasVictory', {
        get: () => this._lastMatchResultWasVictory,
        set: (value) => {
            this._lastMatchResultWasVictory = value;
        }
    });

    /* recent games victories */
    this._recentMatchResults = [];
    Object.defineProperty(this, 'recentMatchResults', {
        get: () => this._recentMatchResults,
        set: (value) => {
            this._recentMatchResults = value;
        }
    });

    /* celebrity clothes picked */
    this._celebrityClothesChosen = 0;
    Object.defineProperty(this, 'celebrityClothesChosen', {
        get: () => this._celebrityClothesChosen,
        set: (value) => {
            this._celebrityClothesChosen = value;
        }
    });

    
    /* limit rewarded ads per-level */
    this._rewardedAdsLeft = GameConfig.getAttribute('UI', 'limitRewardedAdsPerLevel');
    Object.defineProperty(this, 'rewardedAdsLeft', {
        get: () => this._rewardedAdsLeft,
        set: (value) => {
            this._rewardedAdsLeft = value;
        }
    });

};


DataManager.prototype._loadSavedData = function () {
    DataManager.getInstance().username = "You";
    DataManager.getInstance().level = LocalStorageController.getSavedValue(Constants.Storage.CURRENT_LEVEL) || 1;
    DataManager.getInstance().chapter = LocalStorageController.getSavedValue(Constants.Storage.CHAPTER) || 0;
    DataManager.getInstance().gems = LocalStorageController.getSavedValue(Constants.Storage.GEMS) || 0;
    DataManager.getInstance().likesBoostLevel = LocalStorageController.getSavedValue(Constants.Storage.LIKES_BOOST_LEVEL) || 1;
    DataManager.getInstance().gemsBoostLevel = LocalStorageController.getSavedValue(Constants.Storage.GEMS_BOOST_LEVEL) || 1;
    DataManager.getInstance().recentMatchResults = LocalStorageController.getSavedValue(Constants.Storage.RECENT_MATCH_RESULTS) || [];

    if (DataManager.getInstance().level > 3) {
        this._aiVictoryIn = Math.floor(pc.math.random(1, GameConfig.getAttribute('AI', 'guarranteedVictoryEveryMatches').x));
        this._aiVictoryChanceCounter = DataManager.getInstance().level % this._aiVictoryIn;
    } else {
        this._aiVictoryIn = 4;
        this._aiVictoryChanceCounter = 0;
    }

    this.app.fire(EventTypes.GAME_DATA_READY);
};


DataManager.prototype.resetData = function () {
    this.score = 0;
    this.lastLevelRewardGems = 0;
    this.started = false;
    this.finished = false;
    this.lastMatchResultWasVictory = false;
    this.celebrityClothesChosen = 0;
};

DataManager.prototype.isRewardedAdAvailableWithinThisLevel = function(eventID) {
    const limitActive = GameConfig.getAttribute('UI', 'limitRewardedAdsPerLevel') > 0 && GameConfig.getAttribute('UI', 'limitRewardedAdsKeys').indexOf(eventID) !== -1;
    if(!limitActive) {
        return true;
    } else {
        return this.rewardedAdsLeft > 0;
    }
};

DataManager.prototype.consumeRewardedAd = function(eventID) {
    if(GameConfig.getAttribute('UI', 'limitRewardedAdsKeys').indexOf(eventID) !== -1) {
        this.rewardedAdsLeft -= 1;
    }
};

DataManager.prototype.resetRewardedAdLimit = function() {
    this.rewardedAdsLeft = GameConfig.getAttribute('UI', 'limitRewardedAdsPerLevel');
};

DataManager.prototype.playerShouldWin = function () {
    if (this.recentMatchResults.length >= 3) {
        const numVictories = this.getNumVictoriesPerLastThreeMatches();
        if (numVictories <= 0) {
            return true;
        } else if (numVictories <= 1) {
            return Math.random() < 0.6;
        } else if (numVictories <= 2) {
            return Math.random() < 0.3;
        }
    }

    return false;
};

DataManager.prototype.getNumVictoriesPerLastThreeMatches = function () {
    return this.recentMatchResults.reduce((a, b) => a + b, 0);
};

DataManager.prototype.saveMatchResult = function (playerVictory) {
    this.recentMatchResults.push(playerVictory ? 1 : 0);
    while (this.recentMatchResults.length > 3) {
        this.recentMatchResults.shift();
    }
    LocalStorageController.save();
};

DataManager.prototype.increaseAIVictoryChance = function () {
    this._aiVictoryChanceCounter += 1;
};

DataManager.prototype.clearAIVictoryChance = function (chance = 0.8) {
    if (Math.random() < chance) {
        this._aiVictoryChanceCounter = 0;
    } else {
        this._aiVictoryChanceCounter = Math.floor(pc.math.random(0, this._aiVictoryIn));
    }
};

DataManager.prototype.getOpponentScoreMultiplier = function() {
    const chanceFactor = DataManager.getInstance().getAIChanceFactor();
    return pc.math.lerp(GameConfig.getAttribute('AI', 'opponentScoreMultiplierMin'), GameConfig.getAttribute('AI', 'opponentScoreMultiplierMax'), chanceFactor);
};

DataManager.prototype.getAIChanceFactor = function() {
    const chanceFactor = pc.math.clamp(this._aiVictoryChanceCounter / this._aiVictoryIn + pc.math.random(-0.05, 0.05), 0, 1);
    return chanceFactor;
}

DataManager.prototype.getAICorrectChoiceChance = function () {
    const chanceFactor = DataManager.getInstance().getAIChanceFactor();
    const correctrAnswerChance = pc.math.lerp(1 - GameConfig.getAttribute('AI', 'maxErrorChance'), 1 - GameConfig.getAttribute('AI', 'minErrorChance'), chanceFactor);
    return pc.math.clamp(correctrAnswerChance, 0, 1);
};

DataManager.prototype.getRecentMatchResults = function () {
    return this.recentMatchResults;
};

DataManager.prototype.getNextLikesBoostUpgradePrice = function () {
    return GameConfig.getAttribute('gameplay', 'initialLikeLevelUpgradePrice') + (this.likesBoostLevel - 1) * GameConfig.getAttribute('gameplay', 'likesLevelPriceIncrement');
};

DataManager.prototype.getNextGemsBoostUpgradePrice = function () {
    return GameConfig.getAttribute('gameplay', 'initialGemsLevelUpgradePrice') + (this.gemsBoostLevel - 1) * GameConfig.getAttribute('gameplay', 'gemsLevelPriceIncrement');
};

DataManager.prototype.getLikesRate = function () {
    return GameConfig.getAttribute('gameplay', 'likesPerSecondInitial') + (this.likesBoostLevel - 1) * GameConfig.getAttribute('gameplay', 'likesPerSecondPerUpgradeLevel');
};

DataManager.prototype.getLikesPerSelection = function () {
    return GameConfig.getAttribute('gameplay', 'likesPerSelectionInitial') + (this.likesBoostLevel - 1) * GameConfig.getAttribute('gameplay', 'likesPerSelectionPerUpgradeLevel');
};

DataManager.prototype.getGemsReward = function (levelScore = 0) {
    return GameConfig.getAttribute('gameplay', 'gesRewardInitial') + (this.gemsBoostLevel - 1) * GameConfig.getAttribute('gameplay', 'gesRewardPerUpgradeLevel') + levelScore;
};

DataManager.prototype.getNeededLikesForNextChapter = function () {
    return (this.chapter + 1) * GameConfig.getAttribute('gameplay', 'chapterPriceIncrementPerLevel');
};

DataManager.prototype.update = function (dt) {
    if (this.started && !this.finished) {

    }
};

// HierarchyManager.js
var HierarchyManager = pc.createScript('hierarchyManager');


HierarchyManager.getInstance = function () {
    if (!HierarchyManager._instance) console.error('HierarchyManager is not initialized yet');
    return HierarchyManager._instance;
};

HierarchyManager.prototype.initialize = function () {
    HierarchyManager._app = this.app;
    if (!HierarchyManager._instance) {
        HierarchyManager._instance = this;
    }

    this.hierarchyNameMap = new Map();
    this.hierarchyPathMap = new Map();
};

HierarchyManager.prototype.getByName = function (name) {
    const result = this.hierarchyNameMap.get(name);
    if (result) {
        return result;
    } else {
        const foundResult = this.app.root.findByName(name);
        if (foundResult) {
            this.hierarchyNameMap.set(name, foundResult);
            return foundResult;
        } else {
            console.error(`Entity [ ${name} ] not found in hierarchy!`);
        }
    }
};


HierarchyManager.prototype.getByPath = function (path) {
    if (!path.startsWith("Root")) path = "Root/" + path;
    const result = this.hierarchyPathMap.get(path);
    if (result) {
        return result;
    } else {
        const foundResult = this.app.root.findByPath(path);
        if (foundResult) {
            this.hierarchyPathMap.set(path, foundResult);
            return foundResult;
        } else {
            console.error(`Entity path ${path} not found in hierarchy!`);
        }
    }
};



HierarchyManager.prototype.update = function (dt) {

};


// touch-input.js
var TouchInput = pc.createScript('touchInput');

TouchInput.attributes.add('orbitSensitivity', {
    type: 'number', 
    default: 0.4, 
    title: 'Orbit Sensitivity', 
    description: 'How fast the camera moves around the orbit. Higher is faster'
});

TouchInput.attributes.add('distanceSensitivity', {
    type: 'number', 
    default: 0.2, 
    title: 'Distance Sensitivity', 
    description: 'How fast the camera moves in and out. Higher is faster'
});

// initialize code called once per entity
TouchInput.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
    
    // Store the position of the touch so we can calculate the distance moved
    this.lastTouchPoint = new pc.Vec2();
    this.lastPinchMidPoint = new pc.Vec2();
    this.lastPinchDistance = 0;
    
    if (this.orbitCamera && this.app.touch) {
        // Use the same callback for the touchStart, touchEnd and touchCancel events as they 
        // all do the same thing which is to deal the possible multiple touches to the screen
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);
        
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        
        this.on('destroy', function() {
            this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);

            this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        });
    }
};


TouchInput.prototype.getPinchDistance = function (pointA, pointB) {
    // Return the distance between the two points
    var dx = pointA.x - pointB.x;
    var dy = pointA.y - pointB.y;    
    
    return Math.sqrt((dx * dx) + (dy * dy));
};


TouchInput.prototype.calcMidPoint = function (pointA, pointB, result) {
    result.set(pointB.x - pointA.x, pointB.y - pointA.y);
    result.scale(0.5);
    result.x += pointA.x;
    result.y += pointA.y;
};


TouchInput.prototype.onTouchStartEndCancel = function(event) {
    // We only care about the first touch for camera rotation. As the user touches the screen, 
    // we stored the current touch position
    var touches = event.touches;
    if (touches.length == 1) {
        this.lastTouchPoint.set(touches[0].x, touches[0].y);
    
    } else if (touches.length == 2) {
        // If there are 2 touches on the screen, then set the pinch distance
        this.lastPinchDistance = this.getPinchDistance(touches[0], touches[1]);
        this.calcMidPoint(touches[0], touches[1], this.lastPinchMidPoint);
    }
};


TouchInput.fromWorldPoint = new pc.Vec3();
TouchInput.toWorldPoint = new pc.Vec3();
TouchInput.worldDiff = new pc.Vec3();


TouchInput.prototype.pan = function(midPoint) {
    var fromWorldPoint = TouchInput.fromWorldPoint;
    var toWorldPoint = TouchInput.toWorldPoint;
    var worldDiff = TouchInput.worldDiff;
    
    // For panning to work at any zoom level, we use screen point to world projection
    // to work out how far we need to pan the pivotEntity in world space 
    var camera = this.entity.camera;
    var distance = this.orbitCamera.distance;
    
    camera.screenToWorld(midPoint.x, midPoint.y, distance, fromWorldPoint);
    camera.screenToWorld(this.lastPinchMidPoint.x, this.lastPinchMidPoint.y, distance, toWorldPoint);
    
    worldDiff.sub2(toWorldPoint, fromWorldPoint);
     
    this.orbitCamera.pivotPoint.add(worldDiff);    
};


TouchInput.pinchMidPoint = new pc.Vec2();

TouchInput.prototype.onTouchMove = function(event) {
    var pinchMidPoint = TouchInput.pinchMidPoint;
    
    // We only care about the first touch for camera rotation. Work out the difference moved since the last event
    // and use that to update the camera target position 
    var touches = event.touches;
    if (touches.length == 1) {
        var touch = touches[0];
        
        this.orbitCamera.pitch -= (touch.y - this.lastTouchPoint.y) * this.orbitSensitivity;
        this.orbitCamera.yaw -= (touch.x - this.lastTouchPoint.x) * this.orbitSensitivity;
        
        this.lastTouchPoint.set(touch.x, touch.y);
    
    } else if (touches.length == 2) {
        // Calculate the difference in pinch distance since the last event
        var currentPinchDistance = this.getPinchDistance(touches[0], touches[1]);
        var diffInPinchDistance = currentPinchDistance - this.lastPinchDistance;
        this.lastPinchDistance = currentPinchDistance;
                
        this.orbitCamera.distance -= (diffInPinchDistance * this.distanceSensitivity * 0.1) * (this.orbitCamera.distance * 0.1);
        
        // Calculate pan difference
        this.calcMidPoint(touches[0], touches[1], pinchMidPoint);
        this.pan(pinchMidPoint);
        this.lastPinchMidPoint.copy(pinchMidPoint);
    }
};


// orbit-camera.js
var OrbitCamera = pc.createScript('orbitCamera');

OrbitCamera.attributes.add('autoRender', {
    type: 'boolean', 
    default: true, 
    title: 'Auto Render', 
    description: 'Disable to only render when camera is moving (saves power when the camera is still)'
});

OrbitCamera.attributes.add('distanceMax', {type: 'number', default: 0, title: 'Distance Max', description: 'Setting this at 0 will give an infinite distance limit'});
OrbitCamera.attributes.add('distanceMin', {type: 'number', default: 0, title: 'Distance Min'});
OrbitCamera.attributes.add('pitchAngleMax', {type: 'number', default: 90, title: 'Pitch Angle Max (degrees)'});
OrbitCamera.attributes.add('pitchAngleMin', {type: 'number', default: -90, title: 'Pitch Angle Min (degrees)'});

OrbitCamera.attributes.add('inertiaFactor', {
    type: 'number',
    default: 0,
    title: 'Inertia Factor',
    description: 'Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive.'
});

OrbitCamera.attributes.add('focusEntity', {
    type: 'entity',
    title: 'Focus Entity',
    description: 'Entity for the camera to focus on. If blank, then the camera will use the whole scene'
});

OrbitCamera.attributes.add('frameOnStart', {
    type: 'boolean',
    default: true,
    title: 'Frame on Start',
    description: 'Frames the entity or scene at the start of the application."'
});


// Property to get and set the distance between the pivot point and camera
// Clamped between this.distanceMin and this.distanceMax
Object.defineProperty(OrbitCamera.prototype, "distance", {
    get: function() {
        return this._targetDistance;
    },

    set: function(value) {
        this._targetDistance = this._clampDistance(value);
    }
});


// Property to get and set the pitch of the camera around the pivot point (degrees)
// Clamped between this.pitchAngleMin and this.pitchAngleMax
// When set at 0, the camera angle is flat, looking along the horizon
Object.defineProperty(OrbitCamera.prototype, "pitch", {
    get: function() {
        return this._targetPitch;
    },

    set: function(value) {
        this._targetPitch = this._clampPitchAngle(value);
    }
});


// Property to get and set the yaw of the camera around the pivot point (degrees)
Object.defineProperty(OrbitCamera.prototype, "yaw", {
    get: function() {
        return this._targetYaw;
    },

    set: function(value) {
        this._targetYaw = value;

        // Ensure that the yaw takes the shortest route by making sure that 
        // the difference between the targetYaw and the actual is 180 degrees
        // in either direction
        var diff = this._targetYaw - this._yaw;
        var reminder = diff % 360;
        if (reminder > 180) {
            this._targetYaw = this._yaw - (360 - reminder);
        } else if (reminder < -180) {
            this._targetYaw = this._yaw + (360 + reminder);
        } else {
            this._targetYaw = this._yaw + reminder;
        }
    }
});


// Property to get and set the world position of the pivot point that the camera orbits around
Object.defineProperty(OrbitCamera.prototype, "pivotPoint", {
    get: function() {
        return this._pivotPoint;
    },

    set: function(value) {
        this._pivotPoint.copy(value);
    }
});


// Moves the camera to look at an entity and all its children so they are all in the view
OrbitCamera.prototype.focus = function (focusEntity) {
    // Calculate an bounding box that encompasses all the models to frame in the camera view
    this._buildAabb(focusEntity, 0);

    var halfExtents = this._modelsAabb.halfExtents;

    var distance = Math.max(halfExtents.x, Math.max(halfExtents.y, halfExtents.z));
    distance = (distance / Math.tan(0.5 * this.entity.camera.fov * pc.math.DEG_TO_RAD));
    distance = (distance * 2);

    this.distance = distance;

    this._removeInertia();

    this._pivotPoint.copy(this._modelsAabb.center);
};


OrbitCamera.distanceBetween = new pc.Vec3();

// Set the camera position to a world position and look at a world position
// Useful if you have multiple viewing angles to swap between in a scene
OrbitCamera.prototype.resetAndLookAtPoint = function (resetPoint, lookAtPoint) {
    this.pivotPoint.copy(lookAtPoint);
    this.entity.setPosition(resetPoint);

    this.entity.lookAt(lookAtPoint);

    var distance = OrbitCamera.distanceBetween;
    distance.sub2(lookAtPoint, resetPoint);
    this.distance = distance.length();

    this.pivotPoint.copy(lookAtPoint);

    var cameraQuat = this.entity.getRotation();
    this.yaw = this._calcYaw(cameraQuat);
    this.pitch = this._calcPitch(cameraQuat, this.yaw);

    this._removeInertia();
    this._updatePosition();

    if (!this.autoRender) {
        this.app.renderNextFrame = true;
    }
};


// Set camera position to a world position and look at an entity in the scene
// Useful if you have multiple models to swap between in a scene
OrbitCamera.prototype.resetAndLookAtEntity = function (resetPoint, entity) {
    this._buildAabb(entity, 0);
    this.resetAndLookAtPoint(resetPoint, this._modelsAabb.center);
};


// Set the camera at a specific, yaw, pitch and distance without inertia (instant cut)
OrbitCamera.prototype.reset = function (yaw, pitch, distance) {
    this.pitch = pitch;
    this.yaw = yaw;
    this.distance = distance;

    this._removeInertia();

    if (!this.autoRender) {
        this.app.renderNextFrame = true;
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////
// Private methods

OrbitCamera.prototype.initialize = function () {
    this._checkAspectRatio();

    // Find all the models in the scene that are under the focused entity
    this._modelsAabb = new pc.BoundingBox();
    this._buildAabb(this.focusEntity || this.app.root, 0);

    this.entity.lookAt(this._modelsAabb.center);

    this._pivotPoint = new pc.Vec3();
    this._pivotPoint.copy(this._modelsAabb.center);

    this._lastFramePivotPoint = this._pivotPoint.clone();

    // Calculate the camera euler angle rotation around x and y axes
    // This allows us to place the camera at a particular rotation to begin with in the scene
    var cameraQuat = this.entity.getRotation();

    // Preset the camera
    this._yaw = this._calcYaw(cameraQuat);
    this._pitch = this._clampPitchAngle(this._calcPitch(cameraQuat, this._yaw));
    this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);

    this._distance = 0;

    this._targetYaw = this._yaw;
    this._targetPitch = this._pitch;

    // If we have ticked focus on start, then attempt to position the camera where it frames
    // the focused entity and move the pivot point to entity's position otherwise, set the distance
    // to be between the camera position in the scene and the pivot point
    if (this.frameOnStart) {
        this.focus(this.focusEntity || this.app.root);
    } else {
        var distanceBetween = new pc.Vec3();
        distanceBetween.sub2(this.entity.getPosition(), this._pivotPoint);
        this._distance = this._clampDistance(distanceBetween.length());
    }

    this._targetDistance = this._distance;

    this._autoRenderDefault = this.app.autoRender;

    // Do not enable autoRender if it's already off as it's controlled elsewhere
    if (this.app.autoRender) {
        this.app.autoRender = this.autoRender;
    }

    if (!this.autoRender) {
        this.app.renderNextFrame = true;
    }

    this.on('attr:autoRender', function (value, prev) {
        this.app.autoRender = value;
        if (!this.autoRender) {
            this.app.renderNextFrame = true;
        }
    }, this);

    // Reapply the clamps if they are changed in the editor
    this.on('attr:distanceMin', function (value, prev) {
        this._targetDistance = this._clampDistance(this._distance);
    }, this);

    this.on('attr:distanceMax', function (value, prev) {
        this._targetDistance = this._clampDistance(this._distance);
    }, this);

    this.on('attr:pitchAngleMin', function (value, prev) {
        this._targetPitch = this._clampPitchAngle(this._pitch);
    }, this);

    this.on('attr:pitchAngleMax', function (value, prev) {
        this._targetPitch = this._clampPitchAngle(this._pitch);
    }, this);

    // Focus on the entity if we change the focus entity
    this.on('attr:focusEntity', function (value, prev) {
        if (this.frameOnStart) {
            this.focus(value || this.app.root);
        } else {
            this.resetAndLookAtEntity(this.entity.getPosition(), value || this.app.root);
        }
    }, this);

    this.on('attr:frameOnStart', function (value, prev) {
        if (value) {
            this.focus(this.focusEntity || this.app.root);
        }
    }, this);

    var onResizeCanvas = function () {
        this._checkAspectRatio();
        if (!this.autoRender) {
            this.app.renderNextFrame = true;
        }
    };

    this.app.graphicsDevice.on('resizecanvas', onResizeCanvas, this);

    this.on('destroy', function() {
        this.app.graphicsDevice.off('resizecanvas', onResizeCanvas, this);
        this.app.autoRender = this._autoRenderDefault;
    }, this);
};


OrbitCamera.prototype.update = function(dt) {
    // Check if we have are still moving for autorender
    if (!this.autoRender) {
        var distanceDiff = Math.abs(this._targetDistance - this._distance);
        var yawDiff = Math.abs(this._targetYaw - this._yaw);
        var pitchDiff = Math.abs(this._targetPitch - this._pitch);
        var pivotPointDiff = this._lastFramePivotPoint.distance(this._pivotPoint);
    
        this.app.renderNextFrame = this.app.renderNextFrame || 
            distanceDiff > 0.01 || yawDiff > 0.01 || pitchDiff > 0.01 || pivotPointDiff > 0;
    }

    // Add inertia, if any
    var t = this.inertiaFactor === 0 ? 1 : Math.min(dt / this.inertiaFactor, 1);
    this._distance = pc.math.lerp(this._distance, this._targetDistance, t);
    this._yaw = pc.math.lerp(this._yaw, this._targetYaw, t);
    this._pitch = pc.math.lerp(this._pitch, this._targetPitch, t);

    this._lastFramePivotPoint.copy(this._pivotPoint);

    this._updatePosition();
};


OrbitCamera.prototype._updatePosition = function () {
    // Work out the camera position based on the pivot point, pitch, yaw and distance
    this.entity.setLocalPosition(0,0,0);
    this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);

    var position = this.entity.getPosition();
    position.copy(this.entity.forward);
    position.scale(-this._distance);
    position.add(this.pivotPoint);
    this.entity.setPosition(position);
};


OrbitCamera.prototype._removeInertia = function () {
    this._yaw = this._targetYaw;
    this._pitch = this._targetPitch;
    this._distance = this._targetDistance;
};


OrbitCamera.prototype._checkAspectRatio = function () {
    var height = this.app.graphicsDevice.height;
    var width = this.app.graphicsDevice.width;

    // Match the axis of FOV to match the aspect ratio of the canvas so
    // the focused entities is always in frame
    this.entity.camera.horizontalFov = height > width;
};


OrbitCamera.prototype._buildAabb = function (entity, modelsAdded) {
    var i = 0, j = 0, meshInstances;
    
    if (entity instanceof pc.Entity) {
        var allMeshInstances = [];
        var renders = entity.findComponents('render');

        for (i = 0; i < renders.length; ++i) {
            meshInstances = renders[i].meshInstances;
            if (meshInstances) {
                for (j = 0; j < meshInstances.length; j++) {
                    allMeshInstances.push(meshInstances[j]);
                }
            }
        }  

        var models = entity.findComponents('model');
        for (i = 0; i < models.length; ++i) {
            meshInstances = models[i].meshInstances;
            if (meshInstances) {
                for (j = 0; j < meshInstances.length; j++) {
                    allMeshInstances.push(meshInstances[j]);
                }
            }
        }  

        for (i = 0; i < allMeshInstances.length; i++) {
            if (modelsAdded === 0) {
                this._modelsAabb.copy(allMeshInstances[i].aabb);
            } else {
                this._modelsAabb.add(allMeshInstances[i].aabb);
            }

            modelsAdded += 1;
        }
    }

    for (i = 0; i < entity.children.length; ++i) {
        modelsAdded += this._buildAabb(entity.children[i], modelsAdded);
    }

    return modelsAdded;
};


OrbitCamera.prototype._calcYaw = function (quat) {
    var transformedForward = new pc.Vec3();
    quat.transformVector(pc.Vec3.FORWARD, transformedForward);

    return Math.atan2(-transformedForward.x, -transformedForward.z) * pc.math.RAD_TO_DEG;
};


OrbitCamera.prototype._clampDistance = function (distance) {
    if (this.distanceMax > 0) {
        return pc.math.clamp(distance, this.distanceMin, this.distanceMax);
    } else {
        return Math.max(distance, this.distanceMin);
    }
};


OrbitCamera.prototype._clampPitchAngle = function (pitch) {
    // Negative due as the pitch is inversed since the camera is orbiting the entity
    return pc.math.clamp(pitch, -this.pitchAngleMax, -this.pitchAngleMin);
};


OrbitCamera.quatWithoutYaw = new pc.Quat();
OrbitCamera.yawOffset = new pc.Quat();

OrbitCamera.prototype._calcPitch = function(quat, yaw) {
    var quatWithoutYaw = OrbitCamera.quatWithoutYaw;
    var yawOffset = OrbitCamera.yawOffset;

    yawOffset.setFromEulerAngles(0, -yaw, 0);
    quatWithoutYaw.mul2(yawOffset, quat);

    var transformedForward = new pc.Vec3();

    quatWithoutYaw.transformVector(pc.Vec3.FORWARD, transformedForward);

    return Math.atan2(transformedForward.y, -transformedForward.z) * pc.math.RAD_TO_DEG;
};

// mouse-input.js
var MouseInput = pc.createScript('mouseInput');

MouseInput.attributes.add('orbitSensitivity', {
    type: 'number', 
    default: 0.3, 
    title: 'Orbit Sensitivity', 
    description: 'How fast the camera moves around the orbit. Higher is faster'
});

MouseInput.attributes.add('distanceSensitivity', {
    type: 'number', 
    default: 0.15, 
    title: 'Distance Sensitivity', 
    description: 'How fast the camera moves in and out. Higher is faster'
});

// initialize code called once per entity
MouseInput.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
        
    if (this.orbitCamera) {
        var self = this;
        
        var onMouseOut = function (e) {
           self.onMouseOut(e);
        };
        
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        this.app.mouse.on(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

        // Listen to when the mouse travels out of the window
        window.addEventListener('mouseout', onMouseOut, false);
        
        // Remove the listeners so if this entity is destroyed
        this.on('destroy', function() {
            this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
            this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
            this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
            this.app.mouse.off(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

            window.removeEventListener('mouseout', onMouseOut, false);
        });
    }
    
    // Disabling the context menu stops the browser displaying a menu when
    // you right-click the page
    this.app.mouse.disableContextMenu();
  
    this.lookButtonDown = false;
    this.panButtonDown = false;
    this.lastPoint = new pc.Vec2();
};


MouseInput.fromWorldPoint = new pc.Vec3();
MouseInput.toWorldPoint = new pc.Vec3();
MouseInput.worldDiff = new pc.Vec3();


MouseInput.prototype.pan = function(screenPoint) {
    var fromWorldPoint = MouseInput.fromWorldPoint;
    var toWorldPoint = MouseInput.toWorldPoint;
    var worldDiff = MouseInput.worldDiff;
    
    // For panning to work at any zoom level, we use screen point to world projection
    // to work out how far we need to pan the pivotEntity in world space 
    var camera = this.entity.camera;
    var distance = this.orbitCamera.distance;
    
    camera.screenToWorld(screenPoint.x, screenPoint.y, distance, fromWorldPoint);
    camera.screenToWorld(this.lastPoint.x, this.lastPoint.y, distance, toWorldPoint);

    worldDiff.sub2(toWorldPoint, fromWorldPoint);
       
    this.orbitCamera.pivotPoint.add(worldDiff);    
};


MouseInput.prototype.onMouseDown = function (event) {
    switch (event.button) {
        case pc.MOUSEBUTTON_LEFT: {
            this.lookButtonDown = true;
        } break;
            
        case pc.MOUSEBUTTON_MIDDLE: 
        case pc.MOUSEBUTTON_RIGHT: {
            this.panButtonDown = true;
        } break;
    }
};


MouseInput.prototype.onMouseUp = function (event) {
    switch (event.button) {
        case pc.MOUSEBUTTON_LEFT: {
            this.lookButtonDown = false;
        } break;
            
        case pc.MOUSEBUTTON_MIDDLE: 
        case pc.MOUSEBUTTON_RIGHT: {
            this.panButtonDown = false;            
        } break;
    }
};


MouseInput.prototype.onMouseMove = function (event) {    
    var mouse = pc.app.mouse;
    if (this.lookButtonDown) {
        this.orbitCamera.pitch -= event.dy * this.orbitSensitivity;
        this.orbitCamera.yaw -= event.dx * this.orbitSensitivity;
        
    } else if (this.panButtonDown) {
        this.pan(event);   
    }
    
    this.lastPoint.set(event.x, event.y);
};


MouseInput.prototype.onMouseWheel = function (event) {
    this.orbitCamera.distance -= event.wheel * this.distanceSensitivity * (this.orbitCamera.distance * 0.1);
    event.event.preventDefault();
};


MouseInput.prototype.onMouseOut = function (event) {
    this.lookButtonDown = false;
    this.panButtonDown = false;
};

// camera-path.js
var CameraPath = pc.createScript('cameraPath');

CameraPath.attributes.add("pathRoot", { type: "entity", title: "Path Root" });
CameraPath.attributes.add("duration", { type: "number", default: 10, title: "Duration Secs" });

CameraPath.attributes.add("startTime", {
    type: "number",
    default: 0,
    title: "Start Time (Secs)",
    description: "Start the path from a specific point in time"
});

CameraPath.attributes.add('manualMovement', {
    type: 'boolean',
    default: false
});

CameraPath.attributes.add('progressEvent', {
    type: 'string'
});

CameraPath.attributes.add('tweenCurve', {
    type: 'curve',
    curves: ['time'],
    default: {
        keys: [0, 0, 1, 1]
    }
});

CameraPath.attributes.add('useEasing', {
    type: 'boolean',
    default: true
});

CameraPath.attributes.add('easing', {
    type: 'string',
    enum: [
        { "Linear": "Linear" },
        { "QuadraticIn": "QuadraticIn" },
        { "QuadraticOut": "QuadraticOut" },
        { "QuadraticInOut": "QuadraticInOut" },
        { "CubicIn": "CubicIn" },
        { "CubicOut": "CubicOut" },
        { "CubicInOut": "CubicInOut" },
        { "QuarticIn": "QuarticIn" },
        { "QuarticOut": "QuarticOut" },
        { "QuarticInOut": "QuarticInOut" },
        { "QuinticIn": "QuinticIn" },
        { "QuinticOut": "QuinticOut" },
        { "QuinticInOut": "QuinticInOut" },
        { "SineIn": "SineIn" },
        { "SineOut": "SineOut" },
        { "SineInOut": "SineInOut" },
        { "ExponentialIn": "ExponentialIn" },
        { "ExponentialOut": "ExponentialOut" },
        { "ExponentialInOut": "ExponentialInOut" },
        { "CircularIn": "CircularIn" },
        { "CircularOut": "CircularOut" },
        { "CircularInOut": "CircularInOut" },
        { "BackIn": "BackIn" },
        { "BackOut": "BackOut" },
        { "BackInOut": "BackInOut" },
        { "BounceIn": "BounceIn" },
        { "BounceOut": "BounceOut" },
        { "BounceInOut": "BounceInOut" },
        { "ElasticIn": "ElasticIn" },
        { "ElasticOut": "ElasticOut" },
        { "ElasticInOut": "ElasticInOut" }
    ],
    default: "Linear"
});


CameraPath.attributes.add("loop", { type: "boolean", default: false, title: "Loop" });



CameraPath.prototype.initialize = function () {
    this.createPath();

    this.on("attr:pathRoot", function (value, prev) {
        if (value) {
            this.createPath();
            this.time = 0;
        }
    });

    this.on("attr:duration", function (value, prev) {
        if (value) {
            this.createPath();
            this.time = 0;
        }
    });

    this.on("attr:startTime", function (value, prev) {
        this.time = pc.math.clamp(this.startTime, 0, this.duration);
    });

    
    this.on('state', (enabled) => {
        if (enabled) {
            this.time = 0;
            this.finished = false;
        }
    });

    this.time = pc.math.clamp(this.startTime, 0, this.duration);
    this.finished = false;

    this.entity.setPathProgress = progress => this.setPathProgress(progress);

    this.lookAt = new pc.Vec3();
    this.up = new pc.Vec3();

    this.flyingThrough = true;

    if(this.manualMovement) {
        if(this.progressEvent) {
            this.app.on(this.progressEvent, this._setManualProgress, this);
        }
    }
};



CameraPath.prototype.update = function (dt) {
    if (this.finished) return;
    if (this.manualMovement) return;

    this.time += dt;
    if (this.time >= this.duration) {
        if (this.loop) {
            this.time -= this.duration;
        } else {
            this.time = this.duration;
        }
    }

    this.setPathProgress(pc.math.clamp(this.time / this.duration, 0, 1));
};


CameraPath.prototype._setManualProgress = function (progress) {
    if (this.finished) return;

    this.time = progress * this.duration;
    if (this.time >= this.duration) {
        if (this.loop) {
            this.time -= this.duration;
        } else {
            this.time = this.duration;
        }
    }

    this.setPathProgress(pc.math.clamp(this.time / this.duration, 0, 1));
};


CameraPath.prototype.setPathProgress = function (progress) {

    let percent = progress;
    if (this.useEasing) {
        percent = pc[this.easing](progress);
    } else {
        percent = this.tweenCurve.value(progress);
    }

    
    if(!this.finished && percent >= 1.0) {
        this.finished = true;
        this.app.fire(EventTypes.CAMERA_TRANSITION_FINISHED, this.entity.name);
    }


    // Get the interpolated values for the position from the curves     
    this.entity.setPosition(this.px.value(percent), this.py.value(percent), this.pz.value(percent));

    // Get the interpolated values for the look at point from the curves 
    this.lookAt.set(this.tx.value(percent), this.ty.value(percent), this.tz.value(percent));

    // Get the interpolated values for the up vector from the curves     
    this.up.set(this.ux.value(percent), this.uy.value(percent), this.uz.value(percent));

    // Make the camera look at the interpolated target position with the correct
    // up direction to allow for camera roll and to avoid glimbal lock
    this.entity.lookAt(this.lookAt, this.up);
};


CameraPath.prototype.createPath = function () {
    var curveMode = pc.CURVE_CARDINAL;

    // Create curves for position
    this.px = new pc.Curve();
    this.px.type = curveMode;

    this.py = new pc.Curve();
    this.py.type = curveMode;

    this.pz = new pc.Curve();
    this.pz.type = curveMode;

    // Create curves for target look at position
    this.tx = new pc.Curve();
    this.tx.type = curveMode;

    this.ty = new pc.Curve();
    this.ty.type = curveMode;

    this.tz = new pc.Curve();
    this.tz.type = curveMode;

    // Create curves for the 'up' vector for use with the lookAt function to 
    // allow for roll and avoid gimbal lock
    this.ux = new pc.Curve();
    this.ux.type = curveMode;

    this.uy = new pc.Curve();
    this.uy.type = curveMode;

    this.uz = new pc.Curve();
    this.uz.type = curveMode;

    var nodes = this.pathRoot.children;

    // Get the total linear distance of the path (this isn't correct but gives a decent approximation in length)
    var pathLength = 0;

    // Store the distance from the start of the path for each path node
    var nodePathLength = [];

    // For use when calculating the distance between two nodes on the path
    var distanceBetween = new pc.Vec3();

    // Push 0 as we are starting our loop from 1 for ease
    nodePathLength.push(0);

    for (i = 1; i < nodes.length; i++) {
        var prevNode = nodes[i - 1];
        var nextNode = nodes[i];

        // Work out the distance between the current node and the one before in the path
        distanceBetween.sub2(prevNode.getPosition(), nextNode.getPosition());
        pathLength += distanceBetween.length();

        nodePathLength.push(pathLength);
    }

    for (i = 0; i < nodes.length; i++) {
        // Calculate the time for the curve key based on the distance of the path to the node
        // and the total path length so the speed of the camera travel stays relatively
        // consistent throughout
        var t = nodePathLength[i] / pathLength;

        var node = nodes[i];

        var pos = node.getPosition();
        this.px.add(t, pos.x);
        this.py.add(t, pos.y);
        this.pz.add(t, pos.z);

        // Create and store a lookAt position based on the node position and the forward direction
        var lookAt = pos.clone().add(node.forward);
        this.tx.add(t, lookAt.x);
        this.ty.add(t, lookAt.y);
        this.tz.add(t, lookAt.z);

        var up = node.up;
        this.ux.add(t, up.x);
        this.uy.add(t, up.y);
        this.uz.add(t, up.z);
    }
};

// keyboard-input.js
var KeyboardInput = pc.createScript('keyboardInput');

KeyboardInput.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
};

KeyboardInput.prototype.postInitialize = function() {
    if (this.orbitCamera) {
        this.startDistance = this.orbitCamera.distance;
        this.startYaw = this.orbitCamera.yaw;
        this.startPitch = this.orbitCamera.pitch;
        this.startPivotPosition = this.orbitCamera.pivotPoint.clone();
    }
};

KeyboardInput.prototype.update = function(dt) {
    if (this.orbitCamera) {
        // if (this.app.keyboard.wasPressed(pc.KEY_SPACE)) {
        //     this.orbitCamera.reset(this.startYaw, this.startPitch, this.startDistance);
        //     this.orbitCamera.pivotPoint = this.startPivotPosition;
        // }
    }
};


// lerp-and-slerp-camera.js
var LerpAndSlerpCamera = pc.createScript('lerpAndSlerpCamera');

LerpAndSlerpCamera.attributes.add("pointA", { type: "entity", title: "Point A" });
LerpAndSlerpCamera.attributes.add("pointB", { type: "entity", title: "Point B" });

LerpAndSlerpCamera.attributes.add('manualMovement', {
    type: 'boolean',
    default: false
});

LerpAndSlerpCamera.attributes.add('tweenCurve', {
    type: 'curve',
    curves: ['time'],
    default: {
        keys: [0, 0, 1, 1]
    }
});


LerpAndSlerpCamera.attributes.add('useEasing', {
    type: 'boolean',
    default: false
});


LerpAndSlerpCamera.attributes.add('easing', {
    type: 'string',
    enum: [
        { "Linear": "Linear" },
        { "QuadraticIn": "QuadraticIn" },
        { "QuadraticOut": "QuadraticOut" },
        { "QuadraticInOut": "QuadraticInOut" },
        { "CubicIn": "CubicIn" },
        { "CubicOut": "CubicOut" },
        { "CubicInOut": "CubicInOut" },
        { "QuarticIn": "QuarticIn" },
        { "QuarticOut": "QuarticOut" },
        { "QuarticInOut": "QuarticInOut" },
        { "QuinticIn": "QuinticIn" },
        { "QuinticOut": "QuinticOut" },
        { "QuinticInOut": "QuinticInOut" },
        { "SineIn": "SineIn" },
        { "SineOut": "SineOut" },
        { "SineInOut": "SineInOut" },
        { "ExponentialIn": "ExponentialIn" },
        { "ExponentialOut": "ExponentialOut" },
        { "ExponentialInOut": "ExponentialInOut" },
        { "CircularIn": "CircularIn" },
        { "CircularOut": "CircularOut" },
        { "CircularInOut": "CircularInOut" },
        { "BackIn": "BackIn" },
        { "BackOut": "BackOut" },
        { "BackInOut": "BackInOut" },
        { "BounceIn": "BounceIn" },
        { "BounceOut": "BounceOut" },
        { "BounceInOut": "BounceInOut" },
        { "ElasticIn": "ElasticIn" },
        { "ElasticOut": "ElasticOut" },
        { "ElasticInOut": "ElasticInOut" }
    ],
    default: "Linear"
});

LerpAndSlerpCamera.attributes.add("duration", { type: "number", default: 5, title: "Duration (Secs)" });
LerpAndSlerpCamera.attributes.add("loop", { type: "boolean", default: false, title: "Loop" });
LerpAndSlerpCamera.attributes.add("fireEventOnComplete", { type: "string", default: "", title: "Fire event on complete" });



// initialize code called once per entity
LerpAndSlerpCamera.prototype.initialize = function () {
    this.time = 0;
    this.finished = false;

    this.on('state', (enabled) => {
        if (enabled) {
            this.time = 0;
            this.finished = false;
        }
    });

    this.entity.setPathProgress = progress => this.setPathProgress(progress);
};

// update code called every frame
LerpAndSlerpCamera.prototype.update = function (dt) {
    if (this.finished) return;
    if (this.manualMovement) return; 
    
    this.time += dt;
    if (this.time >= this.duration) {
        if (this.loop) {
            this.time -= this.duration;
        } else {
            this.time = this.duration;
        }
    }

    this.setPathProgress(pc.math.clamp(this.time / this.duration, 0, 1));
};


LerpAndSlerpCamera.prototype.setPathProgress = function (progress) {
      
    let percent = progress;
    if (this.useEasing) {
        percent = pc[this.easing](progress);
    } else {
        percent = this.tweenCurve.value(progress);
    }

    if(!this.finished && percent >= 1.0) {
        this.finished = true;
        this.app.fire(EventTypes.CAMERA_TRANSITION_FINISHED, this.entity.name);
    }

    var angle = this.entity.getRotation();
    var position = this.entity.getPosition();

    // Use slerp to smoothly interpolate between two angles
    // http://developer.playcanvas.com/en/api/pc.Quat.html#slerp
    angle.slerp(this.pointA.getRotation(), this.pointB.getRotation(), percent);

    // Use lerp to smoothly interpolate between two positions
    // http://developer.playcanvas.com/en/api/pc.Vec3.html#lerp
    position.lerp(this.pointA.getPosition(), this.pointB.getPosition(), percent);

    this.entity.setRotation(angle);
    this.entity.setPosition(position);

    if (!this.loop && progress >= 1 && !this.finished) {
        this.finished = true;
        if (this.fireEventOnComplete) {
            this.app.fire(this.fireEventOnComplete);
        }
    }
};


// CameraController.js
var CameraController = pc.createScript('cameraController');

CameraController.attributes.add('initialCamera', {
    type: 'entity'
});


CameraController.getInstance = function () {
    if (!CameraController._instance) console.error('CameraController is not initialized yet');
    return CameraController._instance;
};

CameraController.prototype.initialize = function () {
    CameraController._app = this.app;
    if (!CameraController._instance) {
        CameraController._instance = this;
    }

    this.camerasList = this.entity.findComponents('camera').map(c => c.entity);
    this.activeCamera = undefined;
    this.activeCameraName = undefined;

    if (GameConfig.getAttribute('debug', 'hotkeys')) {
        console.error("Debug hotkeys are enabled");
    }
};

CameraController.prototype.postInitialize = function () {
    if (this.initialCamera) {
        CameraController.getInstance().changeCamera(this.initialCamera.name);
    }
}

CameraController.prototype.changeCamera = function (cameraName, syncWithPrevCamera = false) {
    return new Promise((resolve, reject) => {
        const prevCamera = this.getActiveCamera();
        const cameraEntity = this.getCameraByName(cameraName);
        if (cameraEntity) {
            this.activeCameraName = cameraName;
            this.activeCamera = cameraEntity;
            this.camerasList.forEach(child => child.enabled = false);
            if (syncWithPrevCamera) {
                this.activeCamera.setPosition(prevCamera.getPosition());
                this.activeCamera.setRotation(prevCamera.getRotation());
            }
            cameraEntity.enabled = true;
            if (cameraEntity.startTransition) {
                cameraEntity.startTransition().then(() => {
                    resolve(cameraEntity);
                });
            } else {
                resolve(cameraEntity);
            }
        } else {
            console.warn(`Camera ${cameraName} not exists!`);
            resolve(null);
        }
    })

};

CameraController.prototype.getActiveCamera = function () {
    return this.activeCamera;
};

CameraController.prototype.getCameraByName = function (cameraName) {
    return this.camerasList.find(x => x.name === cameraName); //this.entity.findByName(cameraName);
};

CameraController.prototype.getActiveCameraName = function () {
    return this.activeCamera.name;
};

CameraController.prototype._switchToNextCamera = function () {
    this._testCameraIndex = ((this._testCameraIndex || 0) + 1) % this.entity.children.length;
    const child = this.entity.children[this._testCameraIndex];
    if (child.camera) {
        CameraController.getInstance().changeCamera(child.name);
    }
};

CameraController.prototype.update = function (dt) {
    if (GameConfig.getAttribute('debug', 'hotkeys')) {
        if (this.app.keyboard.wasPressed(pc.KEY_C)) {
            this._switchToNextCamera();
        }
    }

    if (GameConfig.getAttribute('debug', 'overlay')) {
        HierarchyManager.getInstance().getByPath('UIContainer/Debug/ActiveCameraText').element.text = this.activeCameraName;
    }
};


// scaleManager.js
/* jshint esversion: 6 */
var ScaleManager = pc.createScript('scaleManager');

ScaleManager.attributes.add('minPortraitScreenRatio', {
    type: 'number',
    default: 0.5625
});

ScaleManager.attributes.add('landscapeBlend', {
    type: 'number',
    default: 0.75
});

ScaleManager.attributes.add('portraitBlend', {
    type: 'number',
    default: 0
});


ScaleManager.getInstance = function () {
    if (!ScaleManager._instance) console.error('ScaleManager is not initialized yet');
    return ScaleManager._instance;
};

ScaleManager.prototype.initialize = function () {
    ScaleManager._app = this.app;
    if (!ScaleManager._instance) {
        ScaleManager._instance = this;
    }

    this.app.graphicsDevice.on('resizecanvas', this.onCanvasResized, this);
    this.on('attr:landscapeBlend', this.refresh, this);
    this.on('attr:portraitBlend', this.refresh, this);
    this.on('attr:mainLight', this.refresh, this);
    
    this.onCanvasResized(this.app.graphicsDevice.canvas.width, this.app.graphicsDevice.canvas.height);
};

ScaleManager.prototype.update = function(dt) {
    
};

ScaleManager.prototype.refresh = function() {
    this.onCanvasResized(this.app.graphicsDevice.canvas.width, this.app.graphicsDevice.canvas.height);
};


ScaleManager.prototype.onCanvasResized = function(width, height) {
    const isLandscape = this.isLandscape();
    const scaleBlend = isLandscape ? this.landscapeBlend : this.portraitBlend;
    const fireResizedEvent = () => {
        this.app.fire(EventTypes.Screen.RESIZED, width, height, isLandscape);
        this.app.fire(EventTypes.Screen.SET_SCALE_BLEND, scaleBlend);
    };
    
    setTimeout(() => fireResizedEvent(), 0);
    
    if(pc.platform.ios) {
        setTimeout(() => fireResizedEvent(), 500);
    }
};


ScaleManager.prototype.isLandscape = function() {
    return (this.app.graphicsDevice.canvas.width / this.app.graphicsDevice.canvas.height) >= this.minPortraitScreenRatio;    
};


ScaleManager.prototype.isPortrait = function() {
    return !this.isLandscape();
};

ScaleManager.prototype.getWidth = function() {
    return this.app.graphicsDevice.canvas.width * this.app.graphicsDevice.maxPixelRatio;
};


ScaleManager.prototype.getHeight = function() {
    return this.app.graphicsDevice.canvas.height * this.app.graphicsDevice.maxPixelRatio;
};


// performanceMonitor.js
var PerformanceMonitor = pc.createScript('performanceMonitor');

PerformanceMonitor.attributes.add('autoAdjustQuality', {
    type: 'boolean',
    default: true
});

PerformanceMonitor.attributes.add('autoShadows', {
    title: "Auto shadows",
    type: 'boolean',
    deafult: false
});

PerformanceMonitor.attributes.add('shadowLights', {
    title: "Shadow lights",
    type: 'entity',
    array: true
});




PerformanceMonitor.attributes.add('debugOutput', {
    type: 'boolean',
    default: false
});


PerformanceMonitor.attributes.add('maxDevicePixelRatio', {
    type: 'number',
    default: 3
});

PerformanceMonitor.attributes.add('minDevicePixelRatio', {
    type: 'number',
    default: 1.0
});


PerformanceMonitor.attributes.add('pixelRatioStep', {
    type: 'number',
    default: 0.25,
    min: 0,
    max: 1
});

PerformanceMonitor.attributes.add('targetFPS', {
    type: 'number',
    default: 60
});

PerformanceMonitor.attributes.add('acceptableFPS', {
    type: 'number',
    default: 45
});

PerformanceMonitor.attributes.add('minAcceptableFPS', {
    type: 'number',
    default: 30
});

PerformanceMonitor.attributes.add('fpsCheckInterval', {
    type: 'number',
    default: 1.5
});

PerformanceMonitor.attributes.add('sampleFrames', {
    type: 'number',
    default: 100
});

PerformanceMonitor.attributes.add('confidenceInterval', {
    type: 'number',
    default: 0.8,
    min: 0.4,
    max: 1
});




PerformanceMonitor.prototype.initialize = function () {
    this._shadowsTurnOffCounter = 0;
    this.maxSupportedPixelRatio = window.devicePixelRatio || 1;
    this.debugText = HierarchyManager.getInstance().getByPath('UIContainer/Debug/PerformanceMonitorText');

    this.on('attr:debugOutput', this._switchDebugTextVisibility, this);
    this._switchDebugTextVisibility();


    /* set initial pixel ratio */
    /* for MacBookPro and desktops with retina displays */
    if (pc.platform.desktop && this.app.graphicsDevice.maxPixelRatio > 1.99) {
        this.setPixelRatio(this.getDeviceOptimalDPR());
    } else {
        this.setPixelRatio(this.getDeviceOptimalDPR());
    }

    this.startPerformanceMonitoring(2000);
};


PerformanceMonitor.prototype.update = function (dt) {
    if (document.hidden) {
        return;
    }
    this.updatePerformanceMonitor(dt);
};

PerformanceMonitor.prototype.swap = function (old) {
    this.initialize();
};



PerformanceMonitor.prototype.updateShadowsSettings = function(shadowsEnabled, forced = false) {
    if(this.shadowLights.length > 0 && (this.autoShadows || forced)) {
        this.shadowLights.forEach(light => {
            if(!shadowsEnabled) {
                this._shadowsTurnOffCounter += 1;
            } else if(this._shadowsTurnOffCounter > 1) return;
            if(light.enabled && light.light.castShadows !== shadowsEnabled) {
                light.light.castShadows = shadowsEnabled;
            }
        });
    }
};

PerformanceMonitor.prototype.startPerformanceMonitoring = function (delay) {
    this.app.root.delayedCall(delay, () => {
        this.performanceMonitoringStarted = true;
        this.performanceMonitoringCounter = 0;
        this.elapsedTime = 0;
        this.frameTimes = [];
        this.lastFPSMeasurements = [];
    });
};


PerformanceMonitor.prototype.updatePerformanceMonitor = function (dt) {
    if (this.performanceMonitoringStarted) {
        /* increase the counter */
        this.performanceMonitoringCounter += 1;
        this.elapsedTime += dt;

        const frameTime = dt;

        if (this.autoAdjustQuality) {
            this.frameTimes.push(frameTime);
            if (this.frameTimes.length >= this.sampleFrames || this.elapsedTime >= this.fpsCheckInterval) {
                this.elapsedTime = 0;
                this.calculateAverageFPS();
            }
        }

    }
};


PerformanceMonitor.prototype.calculateAverageFPS = function () {
    if (this.frameTimes.length < 12) return;
    // console.log('Calculating average FPS based of ' + this.frameTimes.length + ' frames...');
    const sortedTimes = this.frameTimes.slice().sort((a, b) => a - b);
    const lowerBoundFrames = Math.floor(sortedTimes.length * (1 - this.confidenceInterval) / 2);
    const upperBoundFrames = Math.floor(sortedTimes.length * (0.5 + this.confidenceInterval / 2));
    const effectiveFrameTimes = sortedTimes.slice(lowerBoundFrames, upperBoundFrames);
    const totalTime = effectiveFrameTimes.reduce((sum, current) => sum + current, 0);

    const averageFPS = (effectiveFrameTimes.length / totalTime);

    this.lastFPSMeasurements.push(averageFPS);
    while (this.lastFPSMeasurements.length > 20) {
        this.lastFPSMeasurements.shift();
    }

    this.adjustRendererScale(averageFPS);

    this.frameTimes.splice(0, this.frameTimes.length);
};



PerformanceMonitor.prototype.adjustRendererScale = function (averageFPS) {
    if (averageFPS < this.minAcceptableFPS) {
        this.decreaseQuality();
    } else if (averageFPS <= this.acceptableFPS) {
        this.setMediumQuality();
    } else if (averageFPS > this.targetFPS * 0.95) {
        this.increaseQuality();
    }

    this.calculateShadowSettings();

    if (this.debugOutput && this.debugText.enabled) {
        this.debugText.element.text = `${averageFPS.toFixed(1)} / ${this.app.graphicsDevice.maxPixelRatio.toFixed(3)} of ${this.maxDevicePixelRatio}, frames ${this.frameTimes.length}, fps-samples ${this.lastFPSMeasurements.length}`;
    }
};


PerformanceMonitor.prototype.calculateShadowSettings = function () {
    const currentPixelRatio = this.app.graphicsDevice.maxPixelRatio;
    if (/*currentPixelRatio <= this.minDevicePixelRatio && */this.lastFPSMeasurements.length > 3 && this.lastFPSMeasurements.slice(this.lastFPSMeasurements.length - 3).every(fpsValue => fpsValue < this.minAcceptableFPS)) {
        this.updateShadowsSettings(false);
    } else if (currentPixelRatio >= this.getDeviceOptimalDPR() && this.lastFPSMeasurements.length > 3 && this.lastFPSMeasurements.slice(this.lastFPSMeasurements.length - 3).every(fpsValue => fpsValue >= this.acceptableFPS)) {
        this.updateShadowsSettings(true);
    }
};


PerformanceMonitor.prototype.decreaseQuality = function () {
    const targetRatio = pc.math.clamp(this.app.graphicsDevice.maxPixelRatio - this.pixelRatioStep, this.getMinDPR(), this.getMaxDPR());
    this.setPixelRatio(targetRatio);
};

PerformanceMonitor.prototype.increaseQuality = function () {
    const targetRatio = pc.math.clamp(this.app.graphicsDevice.maxPixelRatio + this.pixelRatioStep, this.getMinDPR(), this.getMaxDPR());
    this.setPixelRatio(targetRatio);
};

PerformanceMonitor.prototype.setMediumQuality = function () {
    this.setPixelRatio(this.getDeviceOptimalDPR());
};

/* private */

PerformanceMonitor.prototype.setPixelRatio = function (value) {
    if (value !== this.app.graphicsDevice.maxPixelRatio) {
        //console.log('Pixel ratio set to ', value);
        this.app.graphicsDevice.maxPixelRatio = value;
    }
};


PerformanceMonitor.prototype.getDeviceOptimalDPR = function () {
    const minDPR = this.getMinDPR();
    const maxDPR = this.getMaxDPR();
    return pc.math.clamp(minDPR + (maxDPR - minDPR) / 2, minDPR, maxDPR);
};

PerformanceMonitor.prototype.getMinDPR = function () {
    return Math.min(window.devicePixelRatio || 1, this.minDevicePixelRatio);
};

PerformanceMonitor.prototype.getMaxDPR = function () {
    return Math.min(this.maxSupportedPixelRatio, this.maxDevicePixelRatio);
};


PerformanceMonitor.prototype._switchDebugTextVisibility = function () {
    if (this.debugText) {
        this.debugText.enabled = this.debugOutput;
    }
};


// basicButton.js
/* jshint esversion: 6 */
var BasicButton = pc.createScript('basicButton');

BasicButton.attributes.add('applyScalingTween', {
    title: "Apply scaling tween",
    type: 'boolean',
    default: true
});

BasicButton.attributes.add('defaultScale', {
    title: "Default scale",
    type: 'number',
    default: 1,
    min: 0.5,
    max: 1.5
});

BasicButton.attributes.add('hoverScale', {
    title: "Hover scale",
    type: 'number',
    default: 1.03,
    min: 0.5,
    max: 1.5
});

BasicButton.attributes.add('pressedScale', {
    title: "Pressed scale",
    type: 'number',
    default: 0.97,
    min: 0.5,
    max: 1.5
});

BasicButton.attributes.add('upScaleDuration', {
    title: "Tween duration",
    type: 'number',
    default: 0.085,
    min: 0.005,
    max: 1
});

BasicButton.attributes.add('clickSound', {
    title: "Play sound",
    type: 'boolean',
    default: true
});

BasicButton.attributes.add('soundOnRelease', {
    title: "Sound on release",
    type: 'boolean',
    default: true
});


BasicButton.attributes.add('allowClickThrough', {
    title: "Click through",
    type: 'boolean',
    default: false
});

BasicButton.attributes.add('preventDoubleClick', {
    title: "Prevent rapid double click",
    type: 'boolean',
    default: true
});

BasicButton.attributes.add('doubleClickMinCooldown', {
    title: "Double click min cooldown",
    type: 'number',
    default: 30
});



BasicButton.prototype.initialize = function () {
    this.hovered = false;
    this.lastClickTimestamp = 0;

    this._addEventListeners(this.entity);

    this.available = true;
    this.entity.setAvailable = this._setAvailable.bind(this);
};

BasicButton.prototype._addEventListeners = function (targetEntity) {
    if (this.app.touch) {
        targetEntity.element.on('touchstart', this.onPress, this);
        targetEntity.element.on('touchend', this.onRelease, this);
        targetEntity.element.on('touchleave', this.onLeave, this);
    }
    if (this.app.mouse) {
        targetEntity.element.on('mouseenter', this.onEnter, this);
        targetEntity.element.on('mousedown', this.onPress, this);
        targetEntity.element.on('mouseup', this.onRelease, this);
        targetEntity.element.on('mouseleave', this.onLeave, this);
    }
};

BasicButton.prototype._setAvailable = function (value) {
    this.available = value;
    this.entity.element.useInput = this.available;
};


// When the cursor enters the element assign the hovered texture
BasicButton.prototype.onEnter = function (event) {
    this.hovered = true;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration, pc.Linear)
            .start();
    }
    document.body.style.cursor = 'pointer';
};

BasicButton.prototype.onLeave = function (event) {
    this.hovered = false;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration, pc.Linear)
            .start();
    }
    document.body.style.cursor = 'default';
};

// When we press the element assign the active texture
BasicButton.prototype.onPress = function (event) {
    this.hovered = true;
    if (!this.allowClickThrough) event.stopPropagation();
    if (this.clickSound && !this.soundOnRelease) {
        //play click sound
        this.app.fire(EventTypes.PLAY_SFX, 'click');
    }
    this.wasPressed = true;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale), this.upScaleDuration * 0.5, pc.SineOut)
            .start();
    }
};

BasicButton.prototype.onRelease = function (event) {
    if (this.applyScalingTween) {
        if (this.hovered) {
            event.element.entity.tween(event.element.entity.getLocalScale())
                .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration * 0.5, pc.Linear)
                .start();
        } else {
            event.element.entity.tween(event.element.entity.getLocalScale())
                .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration * 0.5, pc.Linear)
                .start();
        }
    }


    const now = new Date().getTime();
    const elapsedSinceLastClick = now - this.lastClickTimestamp;

    if (this.hovered && this.wasPressed) {
        if(!this.preventDoubleClick || elapsedSinceLastClick >= this.doubleClickMinCooldown) {
            this.triggerClick();
        }
    }

    this.wasPressed = false;
};

BasicButton.prototype.triggerClick = function () {
    this.entity.fire(EventTypes.BUTTON_PRESSED);
    if (this.clickSound && this.soundOnRelease) this.app.fire(EventTypes.PLAY_SFX, 'click');
    VibrationManager.getInstance().hapticSuccess();
    this.lastClickTimestamp = new Date().getTime();
};

BasicButton.assignSimpleAction = function (button, handler, handlerContext) {
    this.triggerEvent = this.triggerEvent || "down";
    if (pc.app.touch) {
        button.element.on(this.triggerEvent === 'down' ? 'touchstart' : 'touchend', handler, handlerContext);
    }
    if (pc.app.mouse) {
        button.element.on(this.triggerEvent === 'down' ? 'mousedown' : 'mouseup', handler, handlerContext);
    }
};


BasicButton.assignAction = BasicButton.assignTapAction = function (button, handler, handlerContext) {

    if (pc.app.touch) {
        button.element.on('touchstart', (event) => {
            button.inputDownParams = { x: event.touch.clientX, y: event.touch.clientY };
        });
        button.element.on('touchend', (event) => {
            if (button.inputDownParams && Utils.distanceBetween(event.touch.clientX, event.touch.clientY, button.inputDownParams.x, button.inputDownParams.y) < 10) {
                handler.call(handlerContext, event);
            }
            button.inputDownParams = null;
        });
    }

    if (pc.app.mouse) {
        button.element.on('mousedown', (event) => {
            button.inputDownParams = { x: event.x, y: event.y };
        });
        button.element.on('mouseup', (event) => {
            if (button.inputDownParams && Utils.distanceBetween(event.x, event.y, button.inputDownParams.x, button.inputDownParams.y) < 10) {
                handler.call(handlerContext, event);
            }
            button.inputDownParams = null;
        });
    }
};

// ScreenBlocker.js
var ScreenBlocker = pc.createScript('screenBlocker');

ScreenBlocker.attributes.add('windowOpacity', {
    type: 'number',
    default: 1
});

ScreenBlocker.prototype.initialize = function () {
    this.app.on(EventTypes.SHOW_TRANSITION_SCREEN, this.showTransitionScreen, this);
    this.app.on(EventTypes.HIDE_TRANSITION_SCREEN, this.hideTransitionScreen, this);

    this.initialColor = this.entity.element.color.clone();
};

ScreenBlocker.prototype.postInitialize = function() {
    this.entity.enabled = false; 
};

ScreenBlocker.prototype.update = function (dt) {
  
};


ScreenBlocker.prototype.swap = function (old) {

};


ScreenBlocker.prototype.showTransitionScreen = function (duration = 0.3, onCompleteCallback = null, splashColor = null) {
    this.resetActiveTween();

    this.entity.enabled = true;
    this.entity.element.color = new pc.Color().fromString(splashColor || this.initialColor.toString());

    if (duration > 0) {
        this.entity.element.opacity = 0.0;
        this.transitionTween = this.entity
            .tween(this.entity.element)
            .to({ opacity: this.windowOpacity }, duration, pc.Linear)
            .onComplete(() => {
                if (onCompleteCallback) onCompleteCallback();
            })
            .start();
    } else {
        this.entity.element.opacity = this.windowOpacity;
        if (onCompleteCallback) onCompleteCallback();
    }
};


ScreenBlocker.prototype.hideTransitionScreen = function (duration = 0.25, onCompleteCallback = null) {

    this.resetActiveTween();

    this.entity.element.opacity = 1.0;
    this.transitionTween = this.entity
        .tween(this.entity.element)
        .to({ opacity: 0 }, duration, pc.SineOut)
        .onComplete(() => {
            this.entity.enabled = false;
            if (onCompleteCallback) onCompleteCallback();
        })
        .start();
};


ScreenBlocker.prototype.resetActiveTween = function () {
    if (this.transitionTween && this.transitionTween.playing) {
        this.transitionTween.stop();
    }
    this.transitionTween = null;
};

// rotateLocal.js
var RotateLocal = pc.createScript('rotateLocal');

RotateLocal.attributes.add('angularSpeed', {
    type: 'vec3',
    default: [0, 180, 0]
});

RotateLocal.prototype.initialize = function() {

};

RotateLocal.prototype.update = function(dt) {
    this.entity.rotateLocal(this.angularSpeed.x * dt, this.angularSpeed.y * dt, this.angularSpeed.z * dt)
};

// uiElementAnimator.js
var UiElementAnimator = pc.createScript('uiElementAnimator');

UiElementAnimator.EASINGS = [
    { "Linear": "Linear" },
    { "QuadraticIn": "QuadraticIn" },
    { "QuadraticOut": "QuadraticOut" },
    { "QuadraticInOut": "QuadraticInOut" },
    { "CubicIn": "CubicIn" },
    { "CubicOut": "CubicOut" },
    { "CubicInOut": "CubicInOut" },
    { "QuarticIn": "QuarticIn" },
    { "QuarticOut": "QuarticOut" },
    { "QuarticInOut": "QuarticInOut" },
    { "QuinticIn": "QuinticIn" },
    { "QuinticOut": "QuinticOut" },
    { "QuinticInOut": "QuinticInOut" },
    { "SineIn": "SineIn" },
    { "SineOut": "SineOut" },
    { "SineInOut": "SineInOut" },
    { "ExponentialIn": "ExponentialIn" },
    { "ExponentialOut": "ExponentialOut" },
    { "ExponentialInOut": "ExponentialInOut" },
    { "CircularIn": "CircularIn" },
    { "CircularOut": "CircularOut" },
    { "CircularInOut": "CircularInOut" },
    { "BackIn": "BackIn" },
    { "BackOut": "BackOut" },
    { "BackInOut": "BackInOut" },
    { "BounceIn": "BounceIn" },
    { "BounceOut": "BounceOut" },
    { "BounceInOut": "BounceInOut" },
    { "ElasticIn": "ElasticIn" },
    { "ElasticOut": "ElasticOut" },
    { "ElasticInOut": "ElasticInOut" }
];


UiElementAnimator.attributes.add('appearManually', {
    type: 'boolean',
    default: false
});

UiElementAnimator.attributes.add('stopAllTweensOnStart', {
    type: 'boolean',
    default: true
});

UiElementAnimator.attributes.add('disabledUntilTweenStarts', {
    type: 'boolean',
    default: false
});

UiElementAnimator.attributes.add('disableInputWhileTweening', {
    type: 'boolean',
    default: true
});

UiElementAnimator.attributes.add('delayDependsOnChildIndex', {
    type: 'boolean',
    default: false
});

UiElementAnimator.attributes.add('resetTransformOnStart', {
    type: 'boolean',
    default: true
});

UiElementAnimator.attributes.add('commonAppearDelay', {
    type: 'number',
    default: 0
});

UiElementAnimator.attributes.add('commonDisappearDelay', {
    type: 'number',
    default: 0
});


UiElementAnimator.attributes.add('autoDisappearAfter', {
    type: 'number',
    default: 0
});

UiElementAnimator.attributes.add('appearOpacityTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'applyToChildrenRecursive',
        type: 'boolean',
        default: true
    }, {
        name: 'startOpacity',
        type: 'number',
        default: 0
    }, {
        name: 'targetOpacity',
        type: 'number',
        default: 1
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});


UiElementAnimator.attributes.add('appearScaleTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'startScale',
        type: 'vec3',
        default: [0, 0, 0]
    }, {
        name: 'targetScale',
        type: 'vec3',
        default: [1, 1, 1]
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});

UiElementAnimator.attributes.add('appearPositionTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'startDeltaPosition',
        type: 'vec3',
        default: [0, -50, 0]
    }, {
        name: 'toCustomPosition',
        type: 'boolean',
        default: false
    }, {
        name: 'customTargetPosition',
        type: 'vec3',
        default: [0, 0, 0]
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});




UiElementAnimator.attributes.add('disappearOpacityTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'applyToChildrenRecursive',
        type: 'boolean',
        default: true
    }, {
        name: 'targetOpacity',
        type: 'number',
        default: 0
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});


UiElementAnimator.attributes.add('disappearScaleTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'targetScale',
        type: 'vec3',
        default: [0, 0, 0]
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});

UiElementAnimator.attributes.add('disappearPositionTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'endDeltaPosition',
        type: 'vec3',
        default: [0, -50, 0]
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});


UiElementAnimator.prototype.initialize = function () {
    this.entity._isAnimatedUIElement = true;
    this.initialScale = this.entity.getLocalScale().clone();
    this.initialPosition = this.entity.getLocalPosition().clone();
    this.initialOpacity = this.entity.element.opacity;
    this.initialInputStatus = this.entity.element.useInput;

    if (this.appearManually) {
        this.entity.on(EventTypes.UI_ELEMENT.APPEAR_MANUALLY, this.doAppearManually, this);
    } else {
        this.entity.on(EventTypes.UI_ELEMENT.APPEAR, this.doAppear, this);
    }
    this.entity.on(EventTypes.UI_ELEMENT.DISAPPEAR, this.doDisappear, this);
};


UiElementAnimator.prototype.doAppearManually = function () {
    this.doAppear();
    if (this.appearManually) {
        this.entity.children.forEach(child => child.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY));
    }
};

UiElementAnimator.prototype.doAppear = function () {
    if (this.stopAllTweensOnStart) {
        this.app.stopAllTweens(this.entity);
    }

    /* reset state on start */
    if(this.resetTransformOnStart) {
        this.entity.setLocalScale(this.initialScale);
        this.entity.setLocalPosition(this.initialPosition);
        this.entity.element.opacity = this.initialOpacity;
        this.entity.element.useInput = this.initialInputStatus;
    }

    this._processAppearTweens().then(() => {
        this.entity.fire(EventTypes.UI_ELEMENT.APPEARED);

        if(this.autoDisappearAfter > 0) {
            this.entity.delayedCall(this.autoDisappearAfter * 1000, () => {
                this.doDisappear();
            });
        }
    });
};

UiElementAnimator.prototype.doDisappear = function () {
    if (this.stopAllTweensOnStart) {
        this.app.stopAllTweens(this.entity);
    }

    this._processDisappearTweens().then(() => {
        this.entity.fire(EventTypes.UI_ELEMENT.DISAPPEARED)
    });
};

UiElementAnimator.prototype.findChildrenWithOpacityValue = function (item, childrenList) {
    childrenList = childrenList || [item];
    for (let i = 0; i < item.children.length; i++) {
        const child = item.children[i];
        if (child.element && child.element.opacity !== undefined && !child.tags.has('keep-opacity')) {
            childrenList.push(child);
        }
        if(!child.tags.has('keep-opacity')) this.findChildrenWithOpacityValue(child, childrenList);
    }
    return childrenList;
};



UiElementAnimator.prototype._processAppearTweens = async function () {
    const tweenCompletePromises = [];

    /* disable input if needed */
    if (this.disableInputWhileTweening) {
        this.entity.element.useInput = false;
    }

    if (this.disabledUntilTweenStarts) {
        this.entity.enabled = false;
    }

    const parentAppearDelay = this.entity.parent && this.entity.parent.script && this.entity.parent.script.uiElementAnimator ? (this.entity.parent.script.uiElementAnimator.commonAppearDelay || 0) : 0;
    const commonAppearDelay = this.commonAppearDelay + parentAppearDelay;


    /* opacity tween */
    if (this.appearOpacityTween.enabled) {
        const targets = this.appearOpacityTween.applyToChildrenRecursive ? this.findChildrenWithOpacityValue(this.entity) : [this.entity];
        tweenCompletePromises.push(... (targets.map(target => new Promise((resolve, reject) => {
            const tweenConfig = this.appearOpacityTween;
            target.element.opacity = tweenConfig.startOpacity;
            target.tween(target.element)
                .to({ opacity: tweenConfig.targetOpacity }, tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonAppearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .onStart(() => { if (this.disabledUntilTweenStarts) this.entity.enabled = true; })
                .start();
        }))));
    }

    /* scale tween */
    if (this.appearScaleTween.enabled) {
        tweenCompletePromises.push(new Promise((resolve, reject) => {
            const tweenConfig = this.appearScaleTween;
            this.entity.setLocalScale(tweenConfig.startScale);
            this.entity.tween(this.entity.getLocalScale())
                .to(tweenConfig.targetScale, tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonAppearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .onStart(() => { if (this.disabledUntilTweenStarts) this.entity.enabled = true; })
                .start();
        }));
    }

    /* position tween */
    if (this.appearPositionTween.enabled) {
        tweenCompletePromises.push(new Promise((resolve, reject) => {
            const tweenConfig = this.appearPositionTween;
            this.entity.setLocalPosition(this.initialPosition.x + tweenConfig.startDeltaPosition.x, this.initialPosition.y + tweenConfig.startDeltaPosition.y, this.initialPosition.z + tweenConfig.startDeltaPosition.z);
            this.entity.tween(this.entity.getLocalPosition())
                .to(tweenConfig.toCustomPosition ? tweenConfig.customTargetPosition : this.initialPosition, tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonAppearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .onStart(() => { if (this.disabledUntilTweenStarts) this.entity.enabled = true; })
                .start();
        }));
    }


    await Promise.all(tweenCompletePromises);

    if(this.entity.element) this.entity.element.useInput = this.initialInputStatus;

    return true;
};



UiElementAnimator.prototype._processDisappearTweens = async function () {
    const tweenCompletePromises = [];

    /* disable input if needed */
    if (this.disableInputWhileTweening) {
        this.entity.element.useInput = false;
    }

    const parentDisappearDelay = this.entity.parent && this.entity.parent.script && this.entity.parent.script.uiElementAnimator ? this.entity.parent.script.uiElementAnimator.commonDisappearDelay : 0;
    const commonDisappearDelay = this.commonDisappearDelay + parentDisappearDelay;

    /* opacity tween */
    if (this.disappearOpacityTween.enabled) {
        const targets = this.disappearOpacityTween.applyToChildrenRecursive ? this.findChildrenWithOpacityValue(this.entity) : [this.entity];

        tweenCompletePromises.push(... (targets.map(target => new Promise((resolve, reject) => {
            const tweenConfig = this.disappearOpacityTween;
            target.tween(target.element)
                .to({ opacity: tweenConfig.targetOpacity }, tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonDisappearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .start();
        }))));
    }

    /* scale tween */
    if (this.disappearScaleTween.enabled) {
        tweenCompletePromises.push(new Promise((resolve, reject) => {
            const tweenConfig = this.disappearScaleTween;
            this.entity.tween(this.entity.getLocalScale())
                .to(tweenConfig.targetScale, tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonDisappearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .start();
        }));
    }

    /* position tween */
    if (this.disappearPositionTween.enabled) {
        tweenCompletePromises.push(new Promise((resolve, reject) => {
            const tweenConfig = this.disappearPositionTween;
            this.entity.tween(this.entity.getLocalPosition())
                .to(this.initialPosition.clone().add(tweenConfig.endDeltaPosition), tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonDisappearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .start();
        }));
    }


    await Promise.all(tweenCompletePromises);

    this.entity.element.useInput = this.initialInputStatus;

    return true;
};


UiElementAnimator.prototype.update = function (dt) {

};



// DebugOverlay.js
var DebugOverlay = pc.createScript('debugOverlay');


DebugOverlay.prototype.initialize = function() {
    if(GameConfig.getAttribute('debug', 'overlay')) {
        console.error('Debug overlay is enabled');
    }

    this.conceptDebug = this.entity.findByName('ConceptDebug');
    this.currentConceptText = this.conceptDebug.findByName('CurrentConceptText');
    this.currentLevelText = this.conceptDebug.findByName('CurrentLevelText');
    this.unlockableConceptText = this.conceptDebug.findByName('UnlockableConceptText');
    this.conceptLoopText = this.conceptDebug.findByName('ConceptLoopText');

};


DebugOverlay.prototype.update = function(dt) {

    this.currentConceptText.element.text = LevelManager.getInstance().testLevel ? `${LevelManager.getInstance().testLevel.getDataObject().concept} [TEST]` : `${ConceptManager.getInstance().getCurrentConceptType()}`;
    this.currentLevelText.element.text = `${LevelManager.getInstance().getDebugInfo()}`;

    this.unlockableConceptText.element.text = `${ConceptManager.getInstance().getUnlockableConceptType()} [${ConceptManager.getInstance().getNextConceptProgress()}/100]`;

    const conceptLoop = ConceptManager.getInstance().getConceptLoop().slice(1, 11).join(', ');
    this.conceptLoopText.element.text = `${conceptLoop}`;

};



// scalePulseTween.js
/* jshint esversion: 6 */
var ScalePulseTween = pc.createScript('scalePulseTween');

ScalePulseTween.attributes.add('targetScale', {
    type: 'vec3',
    default: [1.1, 0.925, 1]
});

ScalePulseTween.attributes.add('duration', {
    type: 'number',
    default: 0.9
});

ScalePulseTween.attributes.add('yoyo', {
    type: 'boolean',
    default: true
});

ScalePulseTween.attributes.add('loop', {
    type: 'boolean',
    default: true
});

ScalePulseTween.attributes.add('startOnlyAfterElementAppeared', {
    type: 'boolean',
    default: false
});


ScalePulseTween.attributes.add('easing', {
    type: 'string',
    enum: [
        {"Linear": "Linear"},
        {"QuadraticIn": "QuadraticIn"},
        {"QuadraticOut": "QuadraticOut"},
        {"QuadraticInOut": "QuadraticInOut"},
        {"CubicIn": "CubicIn"},
        {"CubicOut": "CubicOut"},
        {"CubicInOut": "CubicInOut"},
        {"QuarticIn": "QuarticIn"},
        {"QuarticOut": "QuarticOut"},
        {"QuarticInOut": "QuarticInOut"},
        {"QuinticIn": "QuinticIn"},
        {"QuinticOut": "QuinticOut"},
        {"QuinticInOut": "QuinticInOut"},
        {"SineIn": "SineIn"},
        {"SineOut": "SineOut"},
        {"SineInOut": "SineInOut"},
        {"ExponentialIn": "ExponentialIn"},
        {"ExponentialOut": "ExponentialOut"},
        {"ExponentialInOut": "ExponentialInOut"},
        {"CircularIn": "CircularIn"},
        {"CircularOut": "CircularOut"},
        {"CircularInOut": "CircularInOut"},
        {"BackIn": "BackIn"},
        {"BackOut": "BackOut"},
        {"BackInOut": "BackInOut"},
        {"BounceIn": "BounceIn"},
        {"BounceOut": "BounceOut"},
        {"BounceInOut": "BounceInOut"},
        {"ElasticIn": "ElasticIn"},
        {"ElasticOut": "ElasticOut"},
        {"ElasticInOut": "ElasticInOut"}
    ],
    default: "Linear"
});

ScalePulseTween.prototype.initialize = function() {
    this.initialScale = this.entity.getLocalScale().clone();
    
    if(this.startOnlyAfterElementAppeared) {
        this.entity.on(EventTypes.UI_ELEMENT.APPEARED, () => this._restartTween());
    } else {
        this._restartTween();
    }
    this.on('attr', this._restartTween, this);
};


ScalePulseTween.prototype.update = function(dt) {
    
};


ScalePulseTween.prototype._restartTween = function() {
    // this.app.stopAllTweens(this.entity);
    this.entity.setLocalScale(this.initialScale);
    
    this.entity.tween(this.entity.getLocalScale())
        .to(this.targetScale, this.duration, pc[this.easing])
        .yoyo(this.yoyo)
        .loop(this.loop)
        .start(); 
};


// holdButton.js
/* jshint esversion: 6 */
var HoldButton = pc.createScript('holdButton');


HoldButton.attributes.add('applyScalingTween', {
    title: "Apply scaling tween",
    type: 'boolean',
    default: true
});

HoldButton.attributes.add('defaultScale', {
    title: "Default scale",
    type: 'number',
    default: 1,
    min: 0.5,
    max: 1.5
});

HoldButton.attributes.add('hoverScale', {
    title: "Hover scale",
    type: 'number',
    default: 1.03,
    min: 0.5,
    max: 1.5
});

HoldButton.attributes.add('pressedScale', {
    title: "Pressed scale",
    type: 'number',
    default: 0.97,
    min: 0.5,
    max: 1.5
});

HoldButton.attributes.add('upScaleDuration', {
    title: "Tween duration",
    type: 'number',
    default: 0.085,
    min: 0.005,
    max: 1
});

HoldButton.attributes.add('allowClickThrough', {
    title: "Click through",
    type: 'boolean',
    default: false
});



HoldButton.prototype.initialize = function () {
    this.hovered = false;
    this.pressed = false;

    const scriptContext = this;

    Object.defineProperty(this.entity, 'isPressed', {
        get: () => scriptContext.pressed
    });

    if (pc.platform.mobile && this.app.touch) {
        this.entity.element.on('touchstart', this.onPress, this);
        this.entity.element.on('touchend', this.onRelease, this);
    } else {
        this.entity.element.on('mouseenter', this.onEnter, this);
        this.entity.element.on('mousedown', this.onPress, this);
        this.entity.element.on('mouseup', this.onRelease, this);
        this.entity.element.on('mouseleave', this.onLeave, this);
    }
};


// When the cursor enters the element assign the hovered texture
HoldButton.prototype.onEnter = function (event) {
    this.hovered = true;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration, pc.Linear)
            .start();
    }
    document.body.style.cursor = 'pointer';
};

HoldButton.prototype.onLeave = function (event) {
    this.hovered = false;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration, pc.Linear)
            .start();
    }


    document.body.style.cursor = 'default';
};

// When we press the element assign the active texture
HoldButton.prototype.onPress = function (event) {
    if (!this.allowClickThrough) event.stopPropagation();
    this.pressed = true;

    this.entity.element.opacity = 0.9;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale), this.upScaleDuration * 0.5, pc.SineOut)
            .start();
    }

};

HoldButton.prototype.onRelease = function (event) {
    if (this.applyScalingTween) {
        if (this.hovered) {
            event.element.entity.tween(event.element.entity.getLocalScale())
                .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration * 0.5, pc.Linear)
                .start();
        } else {
            event.element.entity.tween(event.element.entity.getLocalScale())
                .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration * 0.5, pc.Linear)
                .start();
        }
    }
    this.entity.element.opacity = 0.4;
    
    this.pressed = false;
};

// lookAtActiveCamera.js
/* jshint esversion: 6 */
var LookAtactiveCamera = pc.createScript('lookAtactiveCamera');

LookAtactiveCamera.attributes.add('extraAngle', {
    type: 'vec3',
    default: [0, 0, 0]
})

LookAtactiveCamera.prototype.initialize = function() {

};


LookAtactiveCamera.prototype.update = function(dt) {
    const activeCamera = CameraController.getInstance().getActiveCamera();
    if(activeCamera) {
        this.entity.lookAt(activeCamera.getPosition());
        this.entity.rotateLocal(this.extraAngle)
    }
};


// BaseWindow.js
class BaseWindow extends pc.ScriptType {

    initialize() {
        this._initEntityMethods();
        this._initComponents();

        this._pointerDown = false;
        this._pointerX = 0;
        this._pointerY = 0;
        this.app.on(EventTypes.INPUT_DOWN, this._handleInputDown, this);
        this.app.on(EventTypes.INPUT_UP, this._handleInputUp, this);
        this.app.on(EventTypes.TAP_AT, this._handleTapAt, this);
        this.app.on(EventTypes.SWIPE_LEFT, this._handleSwipeLeft, this);
        this.app.on(EventTypes.SWIPE_RIGHT, this._handleSwipeRight, this);
        this.app.on(EventTypes.SWIPE_UP, this._handleSwipeUp, this);
        this.app.on(EventTypes.SWIPE_DOWN, this._handleSwipeDown, this);
    }


    _handleTapAt(x, y, relX, relY) {
        if (!this.entity.enabled) return;

        this.onTap(relX, relY);
    }

    _handleInputDown(x, y, relX, relY) {
        if (!this.entity.enabled) return;

        this._pointerDown = true;
        this._pointerX = relX;
        this._pointerY = relY;

        this.onPointerDown(relX, relY);
    }

    _handleInputUp(x, y, relX, relY) {
        if (!this.entity.enabled) return;

        if (this._pointerDown) {
            this._pointerDown = false;
        }

        this.onPointerUp(relX, relY);
    }

    _handleSwipeLeft() {
        if (!this.entity.enabled) return;

        this.onSwipeLeft();
    }


    _handleSwipeRight() {
        if (!this.entity.enabled) return;

        this.onSwipeRight();
    }


    _handleSwipeUp() {
        if (!this.entity.enabled) return;

        this.onSwipeUp();
    }


    _handleSwipeDown() {
        if (!this.entity.enabled) return;

        this.onSwipeDown();
    }


    onSwipeLeft() {

    }


    onSwipeRight() {

    }


    onSwipeUp() {

    }


    onSwipeDown() {

    }

    onTap(relX, relY) {

    }

    onPointerDown(relX, relY) {

    }

    onPointerUp(relX, relY) {

    }


    update(dt) {

    }


    appearElements() {
        const elements = this.entity.find(node => node._isAnimatedUIElement && !node._uiElementAppearManually);
        elements.forEach(element => {
            element.fire(EventTypes.UI_ELEMENT.APPEAR);
        });

        const completionPromises = elements.map(element => new Promise((resolve, reject) => {
            element.once(EventTypes.UI_ELEMENT.APPEARED, () => resolve());
        }));

        /* listen to animation complete events */
        return Promise.all(completionPromises);
    }


    disappearElements() {
        const elements = this.entity.find(node => node._isAnimatedUIElement);
        elements.forEach(element => {
            element.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
        });

        const completionPromises = elements.map(element => new Promise((resolve, reject) => {
            element.once(EventTypes.UI_ELEMENT.DISAPPEARED, () => resolve());
        }));

        /* listen to animation complete events */
        return Promise.all(completionPromises);
    }


    /* private */
    _initEntityMethods() {
        const scriptContext = this;

        this.entity.show = function (windowToOpenOnExit) {
            return new Promise((resolve, reject) => {
                this._windowToOpenOnExit = windowToOpenOnExit;
                this.enabled = true;
                scriptContext.appearElements().then(() => {
                    resolve();
                    if (scriptContext._onAppeared) scriptContext._onAppeared();
                    UIController.getInstance().dispatchWindowShown(this.name);
                });
                scriptContext._onShow();
            });

        }.bind(this.entity);


        this.entity.hide = function (immediately) {
            return new Promise((resolve, reject) => {
                const disableWindow = () => {
                    if (this.enabled) scriptContext._onHide();
                    this.enabled = false;
                    UIController.getInstance().dispatchWindowHidden(this.name);
                    if (this._windowToOpenOnExit) {
                        const nextWindowName = this._windowToOpenOnExit;
                        this._windowToOpenOnExit = null;
                        UIController.getInstance().showWindow(nextWindowName);
                    }
                };

                if (immediately || !this.enabled) {
                    disableWindow();
                    resolve();
                    if (scriptContext._onHidden) scriptContext._onHidden();
                } else {
                    scriptContext.disappearElements().then(() => {
                        disableWindow();
                        resolve();
                        if (scriptContext._onHidden) scriptContext._onHidden();
                    });
                }
            });
        }.bind(this.entity);


        this.entity.clearPendingWindow = function () {
            this._windowToOpenOnExit = null;
        }.bind(this.entity);
    }

    _initComponents() {

    }

    _onShow() {

    }

    _onHide() {

    }
}


pc.registerScript(BaseWindow, 'baseWindow');

// CloseableWindow.js
class CloseableWindow extends BaseWindow {
    
    initialize() {
        super.initialize();
    }

    _initComponents() {
        /* components */
        this.closeButton = this.entity.findByName('CloseButton');
        
        /* listeners */
        BasicButton.assignAction(this.closeButton, this.onCloseClicked, this);
    }
    
    
    /* event handlers */
    onCloseClicked() {
        this.entity.hide();
    }
}

pc.registerScript(CloseableWindow, 'closeableWindow');

// LibraryManager.js
var LibraryManager = pc.createScript('libraryManager');

LibraryManager.attributes.add('assets', {
    type: 'json',
    schema: [{
        name: 'key',
        type: 'string',
        default: ''
    },
    {
        name: 'asset',
        type: 'asset'
    }],
    array: true
});

LibraryManager.getInstance = function () {
    if (!LibraryManager._instance) console.error('LibraryManager is not initialized yet');
    return LibraryManager._instance;
};

LibraryManager.prototype.initialize = function () {
    LibraryManager._app = this.app;
    if (!LibraryManager._instance) {
        LibraryManager._instance = this;
    }
};

LibraryManager.prototype.isEditorEnvironment = function() {
    return window.location.host === 'launch.playcanvas.com';
};

LibraryManager.prototype.getAssetURL = function(key) {
    let assetRecord = this.assets.find(asset => asset.key === key);
    if(!assetRecord || !assetRecord.asset) {
        console.warn('No assets with key ' + key);
        return null;
    }
    if(this.isEditorEnvironment()) {
        const assetID = assetRecord.asset.id;
        return `api/assets/${assetID}/file/${key}`;
    }
    return assetRecord.asset.file.url;
};

LibraryManager.prototype.getAssetURLFromLibrary = function(key) {
    let assetRecord = this.app.assets.find(key);
    if(!assetRecord) {
        console.warn('No assets with key ' + key);
        return null;
    }
    if(this.isEditorEnvironment()) {
        const assetID = assetRecord.id;
        const assetName = assetRecord.name;
        return `api/assets/${assetID}/file/${assetName}`;
    }
    return assetRecord.file.url;
};

LibraryManager.prototype.update = function(dt) {

};


// localizationManager.js
var LocalizationManager = pc.createScript('localizationManager');


LocalizationManager.attributes.add('autoDetectLanguage', {
    type: 'boolean',
    default: true
});

LocalizationManager._currentLocale = "en-US";

LocalizationManager.getInstance = function () {
    if (!LocalizationManager._instance) throw new Error('LocalizationManager is not initialized yet');
    return LocalizationManager._instance;
};


LocalizationManager.prototype.initialize = function () {
    LocalizationManager._app = this.app;
    if (!LocalizationManager._instance) {
        LocalizationManager._instance = this;
    }

    this.app.once(EventTypes.SAVEDATA_LOADED, this._applySavedLocale, this);
};

LocalizationManager.prototype.postInitialize = function () {

};

LocalizationManager.prototype._applySavedLocale = function () {
    const savedLocale = LocalStorageController.getSavedValue(Constants.Storage.LANGUAGE);
    if (savedLocale) {
        this.changeLocale(savedLocale);
    } else {
        this.detectAndSetBrowserLanguage();
    }
};


LocalizationManager.prototype.addJSON = function (json) {
    if (json) {
        this.app.i18n.addData(json);
    }
};

LocalizationManager.prototype.detectAndSetBrowserLanguage = function () {
    if (this.autoDetectLanguage) {
        const browserLanguage = LocalizationManager.getClientLanguage();
        this._setCurrentLocale(this.app.i18n.findAvailableLocale(browserLanguage));
    }
};


LocalizationManager.prototype.update = function (dt) {

};

LocalizationManager.prototype.changeLocale = function (locale) {
    const closestLocale = this.app.i18n.findAvailableLocale(locale);
    if (closestLocale !== this.app.i18n.locale) {
        this._setCurrentLocale(closestLocale, true);
    }
}


LocalizationManager.prototype._setCurrentLocale = async function (locale, showLoadingOverlay = false) {
    LocalizationManager._currentLocale = locale;
    this.app.i18n.locale = LocalizationManager._currentLocale;
    this.app.fire('app:changeLocale', this.app.i18n.locale);
};

LocalizationManager.prototype.getCurrentLocale = function () {
    return LocalizationManager._currentLocale;
};


LocalizationManager.prototype.getCountryCode = function () {
    return this.getCurrentLocale().substr(0, 2);
};

LocalizationManager.prototype.getLocalizedText = function (textKey, ...replaceParams) {
    let text = this.app.i18n.getText(textKey, this.getCurrentLocale());
    for (let i = 0; i < replaceParams.length; i++) {
        text = text.replace(`{${i}}`, replaceParams[i]);
    }
    return text;
};

LocalizationManager.prototype.getCharactersList = function (...locales) {
    const baseChars = `!"#\$%&'()*+,-0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_\`abcdefghijklmnopqrstuvwxyz{|}~АБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯЇабвгдеєжзиіїйклмнопрстуфхцчшщьюяїЁё¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ`;
    const allCharacters = new Set(baseChars.split(''));
    locales.forEach(locale => {
        const localeFileName = this.app.i18n.findAvailableLocale(locale);
        const localeFile = this.app.assets.find(localeFileName, 'json');
        if (!localeFile) {
            Debug.warn('No locale file for ' + locale);
            return;
        }

        localeFile.resource.data.forEach(item => {
            Object.keys(item.messages).forEach(key => {
                const string = item.messages[key];
                string.split('').forEach(char => allCharacters.add(char));
            });
        });

        Debug.log('File for ' + localeFileName + ': ', localeFile);
    });

    return Array.from(allCharacters).sort().join('');
};

/* Static */

LocalizationManager.getClientLanguage = function () {
    return APIMediator.getCurrentLanguage();
};



// CanvasFontHelper.js
var CanvasFontHelper = pc.createScript('canvasFontHelper');

CanvasFontHelper.attributes.add('fontAssets', {
    type: 'json',
    array: true,
    schema: [{
        name: 'name',
        type: 'string',
        description: 'Name for the font face for the canvas font to reference'
    }, {
        name: 'asset',
        type: 'asset',
        assetType: 'binary',
        description: 'Font asset'
    }]
});



CanvasFontHelper.attributes.add('canvasFonts', {
    type: 'json', 
    array: true,
    schema: [{
        name: 'assetName',
        type: 'string',
        default: 'Arial Canvas Font White',
        description: 'If possible, keep this unique to make this easy to find in the assets registry!'
    }, {
        name: 'fontFaces',
        type: 'string',
        default: 'Arial',
        description: 'This has to be written as though it was in a CSS file (https://www.w3schools.com/cssref/pr_font_font-family.asp)'      
    }, {
        name: 'textureSize', 
        type: 'vec2', 
        default: [2048, 2048],
        description: 'The larger the size, the more VRAM is used. More textures are created to fit the glyphs as the canvas font is updated'
    }, {
        name: 'fontSize', 
        type: 'number',
        default: 64,
        description: 'The larger the size, the sharper the glyph but the more space it takes up on the texture'
    }, {
        name: 'padding', 
        type: 'number',
        default: 0,
        description: 'Glyph padding, try to keep it reasonably small (~1/4 of font size)'
    },  {
        name: 'color',
        type: 'rgb',
        default: [1, 1, 1]
    }]
});

// initialize code called once per entity
CanvasFontHelper.prototype.initialize = function() {
    var self = this;
    var app = this.app;
    var i;
    
    // Create the canvas font assets
    for (i = 0; i < this.canvasFonts.length; ++i) {
        var canvasFont = this.canvasFonts[i];
        canvasFont.asset = new pc.Asset(canvasFont.assetName, 'font', {});
        app.assets.add(canvasFont.asset);
        canvasFont.asset.loaded = false;
    }

    // Load the font files
    var fontsLoadedCount = 0;
    var fontsFacesAdded = [];
    
    for (i = 0; i < this.fontAssets.length; ++i) {
        // Fontface API not supported in IE 11
        var fontAsset = this.fontAssets[i];
        var font = new FontFace(fontAsset.name, 'url(' + fontAsset.asset.getFileUrl() + ')');  
        font.load().then((loadedFace) => {
            document.fonts.add(loadedFace);    
            fontsFacesAdded.push(loadedFace);
            fontsLoadedCount += 1;
            
            if (fontsLoadedCount == self.fontAssets.length) {
                self._onFontFacesLoaded();
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    
    // Remove the fonts and canvas fonts when this script is destroyed
       
    // Cleanup if destroyed
    this.on('destroy', function () {
        var i;
        
        for (i = 0; i < fontsFacesAdded.length; ++i) {
            document.fonts.delete(fontsFacesAdded[i]);
        }
        
        for (i = 0; i < this.canvasFonts.length; ++i) {
            var canvasFont = this.canvasFonts[i];
            canvasFont.asset.resource.destroy();
            app.assets.remove(canvasFont.asset);
        }
    }, this);
};


CanvasFontHelper.prototype._onFontFacesLoaded = function () {
    for (var i = 0; i < this.canvasFonts.length; ++i) {
        var canvasFont = this.canvasFonts[i];
        
        var cf = new pc.CanvasFont(this.app, {
            color: canvasFont.color,
            fontName: canvasFont.fontFaces, // Font has to be added as a font face or exist already on the user's PC
            fontSize: canvasFont.fontSize,
            width: canvasFont.textureSize.x,
            height: canvasFont.textureSize.y,
            padding: canvasFont.padding,
            getCharScale: function (code) {
                // Finger pointing up and rainbow
                if (code === 0x261D || code === 0x1F308) {
                    return 0.8;
                }

                return -1; // use default scale
            }
        });

        canvasFont.asset.resource = cf;

        // Create the textures first
        cf.createTextures(' ');
        canvasFont.asset.loaded = true;
        canvasFont.asset.fire('load', canvasFont.asset);
    }
};


/** Inject Text Element helpers */
const _setTextOriginal = pc.TextElement.prototype._setText;

pc.TextElement.prototype._setText = function() {
    this._entity.fire('bitmaptext:render',  ...arguments);
    _setTextOriginal.call(this, ...arguments);
};

// BitmapText.js
var BitmapText = pc.createScript('bitmapText');


BitmapText.attributes.add('fontAssetName', { 
    type: 'string',
    default: 'CeraPro-Black'
});


BitmapText.prototype.initialize = function () {
    this.entity.__useBitmapFontRenderer__ = true;
    this.initialString = this.entity.element.key || this.entity.element.text;
    this.initialKey = this.entity.element.key;

    if(this.entity.element) {
        this.entity.element.rtlReorder = true;
        this.entity.element.unicodeConverter = true;
    }
};


BitmapText.prototype.postInitialize = function () {
    this._canvasFontAsset = this.app.assets.find(this.fontAssetName);

    if (this._canvasFontAsset == null) {
        console.warn("Can't find font asset: " + this.fontAssetName + ' on ' + this.entity.path);
    } else {
        if (this._canvasFontAsset.loaded) {
            this._onCanvasFontAssetLoaded(this._canvasFontAsset);
        } else {
            this._canvasFontAsset.ready(this._onCanvasFontAssetLoaded, this);
        }
    }
};


BitmapText.prototype._onCanvasFontAssetLoaded = function (asset) {
    this.entity.element.fontAsset = this._canvasFontAsset;
    this.entity.on('bitmaptext:render', this._renderText, this);
    this._updateText(this.entity.element.text);
};


BitmapText.prototype._updateText = function (text) {
    if(!this._canvasFontAsset) return console.error('Asset not loaded: ', this.entity.path);
    if (this._canvasFontAsset.loaded) {
        this._canvasFontAsset.resource.updateTextures(text);
        this.entity.element.text = text;
    } else {
        this.initialString = text;
    }
};

BitmapText.prototype._renderText = function (text) {
    if (this._canvasFontAsset.loaded) {
        this._lastLocale = this.app.i18n.locale;
        this._canvasFontAsset.resource.updateTextures(text);
    }
};



BitmapText.prototype.update = function (dt) {
    if(this.entity.element.key || this.initialKey) {
        if(this.app.i18n.locale !== this._lastLocale) {
            this._updateText(this.app.i18n.getText(this.entity.element.key || this.initialKey));   
        }
    }
};




// TemplateManager.js
var TemplateManager = pc.createScript('templateManager');

TemplateManager.getInstance = function () {
    if (!TemplateManager._instance) console.error('TemplateManager is not initialized yet');
    return TemplateManager._instance;
};

TemplateManager.prototype.initialize = function () {
    TemplateManager._app = this.app;
    if (!TemplateManager._instance) {
        TemplateManager._instance = this;
    }

    this.templateAssets = new Map();
};

TemplateManager.prototype.instantiate = function (templateKey) {
    const template = this.templateAssets.get(templateKey);
    if (template) {
        return template.resource.instantiate();
    } else {
        const templateAsset = this.app.assets.find(templateKey, 'template');
        if (templateAsset) {
            this.templateAssets.set(templateKey, templateAsset);
            if (!templateAsset.resource) {
                console.warn(`No resource in template '${templateAsset.name}'`);
            }
            return templateAsset.resource.instantiate();
        } else {
            console.error('No template "' + templateKey + '" in library!');
        }
    }
};


TemplateManager.prototype.update = function (dt) {

};

// AssetsLoader.js
/* jshint esversion: 6 */
var AssetsLoader = pc.createScript('assetsLoader');

AssetsLoader.getInstance = function () {
    if (!AssetsLoader._instance) console.error('AssetsLoader is not initialized yet');
    return AssetsLoader._instance;
};


AssetsLoader.prototype.initialize = function () {
    AssetsLoader._app = this.app;
    if (!AssetsLoader._instance) {
        AssetsLoader._instance = this;
    }

    /* init variables */
    this.pendingAssets = [];
    this.numAssetsLoaded = 0;
    this.totalAssetsInQueue = 0;
};

AssetsLoader.prototype.update = function (dt) {

};


AssetsLoader.prototype.loadAsset = function (asset) {
    return new Promise((resolve, reject) => {

        if (asset.loaded) {
            return Promise.resolve(asset);
        }

        Debug.log('[Loader] loading asset ' + asset.name);

        asset.once('load', () => {
            this.app.fire(EventTypes.ASSETS_LOADER_ASSET_LOADED, asset);
            resolve(asset);
        });

        asset.once('error', () => {
            console.warn('failed to load ' + asset.id + ' ' + asset.name);
            this.app.fire(EventTypes.ASSETS_LOADER_ASSET_FAILED, asset);
            reject('an error occurred during asset ' + asset.id + ' (' + assetName + ') loading');
        });

        this.app.assets.load(asset);
    });
};


AssetsLoader.prototype.loadAssetByName = function (assetName, assetType) {
    const asset = this.app.assets.find(assetName, assetType);
    if (!asset) {
        return Pormise.reject(`Asset '${assetName}' not found in the app library!`);
    }

    return this.loadAsset(asset);
};



AssetsLoader.prototype.loadAssets = function (assetsList) {
    return new Promise((resolve, reject) => {

        let pendingAssets = assetsList.filter(a => !a.loaded);
        let totalAssetsInQueue = pendingAssets.length;
        let numAssetsLoaded = 0;

        // console.log(`Preloading ${pendingAssets.length} assets ...`);
        this.app.fire(EventTypes.ASSETS_LOADER_STARTED_LOADING, totalAssetsInQueue);

        const handleAsset = asset => {
            const assetIndex = pendingAssets.indexOf(asset);
            if (assetIndex !== -1) {
                numAssetsLoaded += 1;
            }
            this.app.fire(EventTypes.ASSETS_LOADER_PROGRESS, numAssetsLoaded / totalAssetsInQueue);
        };

        this.app.on(EventTypes.ASSETS_LOADER_ASSET_LOADED, handleAsset);
        this.app.on(EventTypes.ASSETS_LOADER_ASSET_FAILED, handleAsset);

        const promises = pendingAssets.map(asset => this.loadAsset(asset));

        Promise.all(promises).then((result) => {
            // console.log('Pending assets have finished loading');
            this.app.fire(EventTypes.ASSETS_LOADER_COMPLETE);
            resolve();
        }).catch(error => {
            console.log('All the assets have finished loading, however some failed');
            this.app.fire(EventTypes.ASSETS_LOADER_COMPLETE);
            reject(error);
        }).finally(result => {
            this.app.off(EventTypes.ASSETS_LOADER_ASSET_LOADED, handleAsset);
            this.app.off(EventTypes.ASSETS_LOADER_ASSET_FAILED, handleAsset);
        });
    });
};



AssetsLoader.prototype.loadByTag = function (...tags) {
    return this.loadAssets(this.app.assets.findByTag(...tags));
};

AssetsLoader.prototype.getAssetsByTag = function (...tags) {
    return this.app.assets.findByTag(...tags);
};


AssetsLoader.prototype.loadByTagWithLoadingOverlay = function(assetTagsList, postDelay = 0) {
    if(typeof assetTagsList === 'string') assetTagsList = [assetTagsList];

    return new Promise((resolve, reject) => {
        const assetsList = AssetsLoader.getInstance().getAssetsByTag(...assetTagsList);

        if (assetsList.length > 0) {
            LoadingOverlay.show(0.15);
            AssetsLoader.getInstance().loadAssets(assetsList).then(result => {

            }).catch(error => {
                console.warn('asset loading error', error)
            }).finally(() => {
                Utils.wait(postDelay).then(() => {
                    LoadingOverlay.hide(0.35);
                });
                resolve();
            })
        } else {
            resolve();
        }
    });
}


AssetsLoader.prototype.loadPendingAssets = function () {
    return this.loadAssets(this.app.assets.filter(asset => asset.loading));
};


AssetsLoader.prototype.loadNotLoadedAssets = function () {
    return this.loadAssets(this.app.assets.filter(asset => !asset.loaded));
};


// LoadingOverlay.js
var LoadingOverlay = pc.createScript('loadingOverlay');

LoadingOverlay.getDefaultBackground = function() {
    return `url(${LibraryManager.getInstance().getAssetURL('loading_bg_final.jpg')}) no-repeat center`;
};

LoadingOverlay.show = function (config = {}) {
    return new Promise((resolve, reject) => {
        const color = typeof config.color !== 'undefined' ? config.color : LoadingOverlay.getDefaultBackground();
        const transitionDuration = Math.max(0.001, typeof config.transitionDuration !== 'undefined' ? config.transitionDuration : 0.125);
        const textValue = config.text || "";

        const preloader = document.querySelector("#preloader");
        if (!preloader) return;

        const preloaderAnimation = document.querySelector("#preloaderAnimation");
        if (preloaderAnimation) {
            preloaderAnimation.style.display = 'block';
            const walkingModel = document.querySelector('#walking-model');
            if(walkingModel) {
                walkingModel.src = LibraryManager.getInstance().getAssetURL('loading_walk_animation.gif');
            }
        }

        const loadingText = document.querySelector('#loading-text');
        if(loadingText) {
            loadingText.innerHTML = textValue;
        }

        preloader.style.background = color;
        preloader.style.backgroundSize = 'cover';

        document.documentElement.style.setProperty('--preloader-transition-duration', transitionDuration + 's');

        function onTransitionEnd() {
            preloader.removeEventListener('transitionend', onTransitionEnd);
            resolve();
        }
        if(transitionDuration > 0) preloader.addEventListener('transitionend', onTransitionEnd, false)
            else setTimeout(() => resolve(), 0);

        if (preloader.classList.contains('preloader-hidden')) preloader.classList.remove('preloader-hidden');
        if (!preloader.classList.contains('preloader-visible')) preloader.classList.add('preloader-visible');
    })

};

LoadingOverlay.hide = function (config = {}) {
    return new Promise((resolve, reject) => {

        const transitionDuration = Math.max(0.001, typeof config.transitionDuration !== 'undefined' ? config.transitionDuration : 0.2);

        const preloader = document.querySelector("#preloader");
        if (!preloader) return;

        const color = typeof config.color !== 'undefined' ? config.color : LoadingOverlay.getDefaultBackground();
        preloader.style.background = color;
        preloader.style.backgroundSize = 'cover';
            
        document.documentElement.style.setProperty('--preloader-transition-duration', transitionDuration + 's');

        const preloaderAnimation = document.querySelector("#preloaderAnimation");
        if (preloaderAnimation) preloaderAnimation.style.display = 'none';


        if (preloader.classList.contains('preloader-visible')) preloader.classList.remove('preloader-visible');
        if (!preloader.classList.contains('preloader-hidden')) preloader.classList.add('preloader-hidden');
        
        function onTransitionEnd() {
            preloader.removeEventListener('transitionend', onTransitionEnd);
            resolve();
        }
        if(transitionDuration > 0) setTimeout(() => preloader.addEventListener('transitionend', onTransitionEnd, false), 0);
            else setTimeout(() => resolve(), 0);
    });
};

LoadingOverlay.transition = async function (inConfig, outConfig, callback) {
    await LoadingOverlay.show(inConfig);
    if(callback) callback();
    await LoadingOverlay.hide(outConfig);
    return Promise.resolve(true);
}


// uiParticleSystemFix.js
var UiParticleSystemFix = pc.createScript('uiParticleSystemFix');


UiParticleSystemFix.prototype.initialize = function () {
    this.app.on(EventTypes.Screen.RESIZED, this.onScreenResized, this);
    this._originalScale = this.entity.getLocalScale().clone();
    this._scaleCorrectionVec = new pc.Vec2(1, 1);

    this.onScreenResized(UIController.getInstance().getScreenWidth(), UIController.getInstance().getScreenHeight());
};


UiParticleSystemFix.prototype.update = function (dt) {

};

UiParticleSystemFix.prototype.onScreenResized = function (width, height, isLandscape) {
    const aspectRatio = UIController.getInstance().getScreenWidth() / UIController.getInstance().getScreenHeight();

    if(aspectRatio >= 1) {
        this._scaleCorrectionVec.set(width / height, 1);
    } else {
        this._scaleCorrectionVec.set(1, 1 / aspectRatio);
    }

    /* swap width & height */
    this.entity.setLocalScale(this._scaleCorrectionVec.y, this._scaleCorrectionVec.x, this._originalScale.z);
};


// positionTween.js
var PositionTween = pc.createScript('positionTween');

PositionTween.attributes.add('deltaPosition', {
    type: 'vec3',
    default: [0, 1, 0]
});

PositionTween.attributes.add('duration', {
    type: 'number',
    default: 0.9
});

PositionTween.attributes.add('yoyo', {
    type: 'boolean',
    default: true
});

PositionTween.attributes.add('loop', {
    type: 'boolean',
    default: true
});

PositionTween.attributes.add('randomPhase', {
    type: 'boolean',
    default: true
});




PositionTween.attributes.add('easing', {
    type: 'string',
    enum: [
        {"Linear": "Linear"},
        {"QuadraticIn": "QuadraticIn"},
        {"QuadraticOut": "QuadraticOut"},
        {"QuadraticInOut": "QuadraticInOut"},
        {"CubicIn": "CubicIn"},
        {"CubicOut": "CubicOut"},
        {"CubicInOut": "CubicInOut"},
        {"QuarticIn": "QuarticIn"},
        {"QuarticOut": "QuarticOut"},
        {"QuarticInOut": "QuarticInOut"},
        {"QuinticIn": "QuinticIn"},
        {"QuinticOut": "QuinticOut"},
        {"QuinticInOut": "QuinticInOut"},
        {"SineIn": "SineIn"},
        {"SineOut": "SineOut"},
        {"SineInOut": "SineInOut"},
        {"ExponentialIn": "ExponentialIn"},
        {"ExponentialOut": "ExponentialOut"},
        {"ExponentialInOut": "ExponentialInOut"},
        {"CircularIn": "CircularIn"},
        {"CircularOut": "CircularOut"},
        {"CircularInOut": "CircularInOut"},
        {"BackIn": "BackIn"},
        {"BackOut": "BackOut"},
        {"BackInOut": "BackInOut"},
        {"BounceIn": "BounceIn"},
        {"BounceOut": "BounceOut"},
        {"BounceInOut": "BounceInOut"},
        {"ElasticIn": "ElasticIn"},
        {"ElasticOut": "ElasticOut"},
        {"ElasticInOut": "ElasticInOut"}
    ],
    default: "Linear"
});

PositionTween.prototype.initialize = function() {
    this.initialLocalPosition = this.entity.getLocalPosition().clone();
    
    this._restartTween();
    this.on('attr', this._restartTween, this);
};


PositionTween.prototype.update = function(dt) {
    
};


PositionTween.prototype._restartTween = function() {
    this.entity.setLocalPosition(this.initialLocalPosition);
    this._targetLocalPosition = this.initialLocalPosition.clone().add(this.deltaPosition);
    
    this.entity.tween(this.entity.getLocalPosition())
        .to(this._targetLocalPosition, this.duration, pc[this.easing])
        .delay(this.randomPhase ? pc.math.random(0, this.duration) : 0)
        .yoyo(this.yoyo)
        .loop(this.loop)
        .start(); 
};





// opacityTween.js
var OpacityTween = pc.createScript('opacityTween');

OpacityTween.attributes.add('targetOpacity', {
    type: 'number',
    default: 0.5
});

OpacityTween.attributes.add('duration', {
    type: 'number',
    default: 0.9
});

OpacityTween.attributes.add('yoyo', {
    type: 'boolean',
    default: true
});

OpacityTween.attributes.add('loop', {
    type: 'boolean',
    default: true
});


OpacityTween.attributes.add('sprite', {
    type: 'boolean',
    default: false
});


OpacityTween.attributes.add('easing', {
    type: 'string',
    enum: [
        { "Linear": "Linear" },
        { "QuadraticIn": "QuadraticIn" },
        { "QuadraticOut": "QuadraticOut" },
        { "QuadraticInOut": "QuadraticInOut" },
        { "CubicIn": "CubicIn" },
        { "CubicOut": "CubicOut" },
        { "CubicInOut": "CubicInOut" },
        { "QuarticIn": "QuarticIn" },
        { "QuarticOut": "QuarticOut" },
        { "QuarticInOut": "QuarticInOut" },
        { "QuinticIn": "QuinticIn" },
        { "QuinticOut": "QuinticOut" },
        { "QuinticInOut": "QuinticInOut" },
        { "SineIn": "SineIn" },
        { "SineOut": "SineOut" },
        { "SineInOut": "SineInOut" },
        { "ExponentialIn": "ExponentialIn" },
        { "ExponentialOut": "ExponentialOut" },
        { "ExponentialInOut": "ExponentialInOut" },
        { "CircularIn": "CircularIn" },
        { "CircularOut": "CircularOut" },
        { "CircularInOut": "CircularInOut" },
        { "BackIn": "BackIn" },
        { "BackOut": "BackOut" },
        { "BackInOut": "BackInOut" },
        { "BounceIn": "BounceIn" },
        { "BounceOut": "BounceOut" },
        { "BounceInOut": "BounceInOut" },
        { "ElasticIn": "ElasticIn" },
        { "ElasticOut": "ElasticOut" },
        { "ElasticInOut": "ElasticInOut" }
    ],
    default: "Linear"
});


OpacityTween.prototype.initialize = function () {
    this.targetElement = this.sprite ? this.entity.sprite : this.entity.element;
    this.initialOpacity =  this.targetElement.opacity;

    this._restartTween();
    this.on('attr', this._restartTween, this);
};

OpacityTween.prototype._restartTween = function() {
    // this.app.stopAllTweens(this.entity);
    this.targetElement.opacity = this.initialOpacity;
    
    this.entity.tween(this.targetElement)
        .to({opacity: this.targetOpacity}, this.duration, pc[this.easing])
        .yoyo(this.yoyo)
        .loop(this.loop)
        .start(); 
};


OpacityTween.prototype.update = function (dt) {

};


// dynamicFov.js
var DynamicFov = pc.createScript('dynamicFov');


DynamicFov.attributes.add('minLandscapeAspectRatio', {
    type: 'number',
    default: 0.8
});


DynamicFov.attributes.add('copyInitialCameraFov', {
    type: 'boolean',
    default: false
});


DynamicFov.attributes.add('portraitFovMode', {
    type: 'boolean',
    enum: [
        { "Vertical": false },
        { "Horizontal": true },
    ],
    default: false
});

DynamicFov.attributes.add('portraitFov', {
    type: 'number',
    default: 45
});

DynamicFov.attributes.add('landscapeFovMode', {
    type: 'boolean',
    enum: [
        { "Vertical": false },
        { "Horizontal": true },
    ],
    default: false
});

DynamicFov.attributes.add('landscapeFov', {
    type: 'number',
    default: 45
});


DynamicFov.prototype.initialize = function () {
    this._originalFov = this.entity.camera.fov;

    this.app.on('attr', this.onResizeCanvas, this);
    this.app.graphicsDevice.on('resizecanvas', this.onResizeCanvas, this);

    this.onResizeCanvas();
};

DynamicFov.prototype.update = function (dt) {

};

DynamicFov.prototype.onResizeCanvas = function () {
    const height = this.app.graphicsDevice.height;
    const width = this.app.graphicsDevice.width;
    const aspectRatio = width / height;

    if (aspectRatio > this.minLandscapeAspectRatio) {
        this.entity.camera.fov = this.copyInitialCameraFov ? this._originalFov : this.landscapeFov;
        this.entity.camera.horizontalFov = this.landscapeFovMode;
    } else {
        this.entity.camera.fov = this.copyInitialCameraFov ? this._originalFov : this.portraitFov;
        this.entity.camera.horizontalFov = this.portraitFovMode;
    }
};

// cameraTransition.js
var CameraTransition = pc.createScript('cameraTransition');


CameraTransition.attributes.add('autoStart', {
    title: "Auto Start On Enable",
    type: 'boolean',
    default: true
});

CameraTransition.attributes.add("startCamera", { type: "entity", title: "Start Camera" });
CameraTransition.attributes.add("endCamera", { type: "entity", title: "End Camera" });
CameraTransition.attributes.add("duration", { type: "number", default: 1, title: "Duration (Secs)" });

CameraTransition.attributes.add('tweenCurve', {
    type: 'curve',
    curves: ['time'],
    default: {
        keys: [0, 0, 1, 1]
    }
});

CameraTransition.attributes.add('useEasing', {
    type: 'boolean',
    default: true
});

CameraTransition.attributes.add('easing', {
    type: 'string',
    enum: [
        { "Linear": "Linear" },
        { "QuadraticIn": "QuadraticIn" },
        { "QuadraticOut": "QuadraticOut" },
        { "QuadraticInOut": "QuadraticInOut" },
        { "CubicIn": "CubicIn" },
        { "CubicOut": "CubicOut" },
        { "CubicInOut": "CubicInOut" },
        { "QuarticIn": "QuarticIn" },
        { "QuarticOut": "QuarticOut" },
        { "QuarticInOut": "QuarticInOut" },
        { "QuinticIn": "QuinticIn" },
        { "QuinticOut": "QuinticOut" },
        { "QuinticInOut": "QuinticInOut" },
        { "SineIn": "SineIn" },
        { "SineOut": "SineOut" },
        { "SineInOut": "SineInOut" },
        { "ExponentialIn": "ExponentialIn" },
        { "ExponentialOut": "ExponentialOut" },
        { "ExponentialInOut": "ExponentialInOut" },
        { "CircularIn": "CircularIn" },
        { "CircularOut": "CircularOut" },
        { "CircularInOut": "CircularInOut" },
        { "BackIn": "BackIn" },
        { "BackOut": "BackOut" },
        { "BackInOut": "BackInOut" },
        { "BounceIn": "BounceIn" },
        { "BounceOut": "BounceOut" },
        { "BounceInOut": "BounceInOut" },
        { "ElasticIn": "ElasticIn" },
        { "ElasticOut": "ElasticOut" },
        { "ElasticInOut": "ElasticInOut" }
    ],
    default: "Linear"
});


CameraTransition.attributes.add('tweenPosition', {
    type: 'boolean',
    default: true
});


CameraTransition.attributes.add('tweenRotation', {
    type: 'boolean',
    default: true
});

CameraTransition.attributes.add('tweenFov', {
    type: 'boolean',
    default: true
});

CameraTransition.attributes.add('createPathOnceInitialized', {
    type: 'boolean',
    default: false
});


CameraTransition.attributes.add('recreatePathEveryStart', {
    type: 'boolean',
    default: true
});

CameraTransition.prototype.initialize = function () {

    this._initialWorldPosition = this.entity.getPosition().clone();
    this._initialWorldRotation = this.entity.getRotation().clone();

    this.time = pc.math.clamp(this.startTime, 0, this.duration);
    this.started = false;
    this.finished = false;
    this.lookAt = new pc.Vec3();
    this.up = new pc.Vec3();


    this.on('state', (enabled) => {
        if (enabled && this.autoStart) {
            this.reset();
            this.startTransition();
        }
    });

    if(this.createPathOnceInitialized) {
        this.createPath();
    }


    this.entity.setPathProgress = this.setPathProgress.bind(this);
    this.entity.startTransition = this.startTransition.bind(this);
    this.entity.reset = this.reset.bind(this);
};

CameraTransition.prototype.reset = function () {
    this.started = false;
    this.finished = false;
    this.time = 0;
    if (this.px) this.setPathProgress(0);
};

CameraTransition.prototype.startTransition = function () {
    return new Promise((resolve, reject) => {
        if (!this.startCamera) {
            this.entity.setPosition(this._initialWorldPosition);
            this.entity.setRotation(this._initialWorldRotation);
        }

        if (this.recreatePathEveryStart || !this._pathCreated) {
            this.createPath();
        }

        this.time = 0;
        this.started = true;
        this.finished = false;

        this.entity.off(EventTypes.INTERNAL_CAMERA_TRANSITION_FINISHED);
        this.entity.once(EventTypes.INTERNAL_CAMERA_TRANSITION_FINISHED, () => resolve(this.entity));
    });
};

CameraTransition.prototype.update = function (dt) {
    if (this.started && !this.finished) {
        this._updatePlayback(dt);
    }
};

CameraTransition.prototype._updatePlayback = function (dt) {
    this.time += dt;
    if (this.time >= this.duration) {
        this.time = this.duration;
    }

    this.setPathProgress(pc.math.clamp(this.time / this.duration, 0, 1));
};

CameraTransition.prototype.setPathProgress = function (progress) {

    let percent = progress;
    if (this.useEasing) {
        percent = pc[this.easing](progress);
    } else {
        percent = this.tweenCurve.value(progress);
    }


    if (!this.finished && percent >= 1.0) {
        this.finished = true;
        this.entity.fire(EventTypes.INTERNAL_CAMERA_TRANSITION_FINISHED);
        this.app.fire(EventTypes.CAMERA_TRANSITION_FINISHED, this.entity.name);
    }


    if (this.tweenPosition) {
        // Get the interpolated values for the position from the curves     
        this.entity.setPosition(this.px.value(percent), this.py.value(percent), this.pz.value(percent));
    }

    if (this.tweenRotation) {
        // Get the interpolated values for the look at point from the curves 
        this.lookAt.set(this.tx.value(percent), this.ty.value(percent), this.tz.value(percent));

        // Get the interpolated values for the up vector from the curves     
        this.up.set(this.ux.value(percent), this.uy.value(percent), this.uz.value(percent));

        // Make the camera look at the interpolated target position with the correct
        // up direction to allow for camera roll and to avoid glimbal lock
        this.entity.lookAt(this.lookAt, this.up);
    }

    if (this.tweenFov) {
        const startCamera = this.startCamera ? this.startCamera : this.entity;
        this.entity.camera.fov = pc.math.lerp(startCamera.camera.fov, this.endCamera.camera.fov, percent);
        this.entity.camera.horizontalFov = percent > 0.5 ? this.endCamera.camera.horizontalFov : startCamera.camera.horizontalFov;
    }
};


CameraTransition.prototype.createPath = function () {
    const curveMode = pc.CURVE_CARDINAL;

    // Create curves for position
    this.px = new pc.Curve();
    this.px.type = curveMode;

    this.py = new pc.Curve();
    this.py.type = curveMode;

    this.pz = new pc.Curve();
    this.pz.type = curveMode;

    // Create curves for target look at position
    this.tx = new pc.Curve();
    this.tx.type = curveMode;

    this.ty = new pc.Curve();
    this.ty.type = curveMode;

    this.tz = new pc.Curve();
    this.tz.type = curveMode;

    // Create curves for the 'up' vector for use with the lookAt function to 
    // allow for roll and avoid gimbal lock
    this.ux = new pc.Curve();
    this.ux.type = curveMode;

    this.uy = new pc.Curve();
    this.uy.type = curveMode;

    this.uz = new pc.Curve();
    this.uz.type = curveMode;

    var nodes = [this.startCamera || this.entity, this.endCamera];

    // Get the total linear distance of the path (this isn't correct but gives a decent approximation in length)
    var pathLength = 0;

    // Store the distance from the start of the path for each path node
    var nodePathLength = [];

    // For use when calculating the distance between two nodes on the path
    var distanceBetween = new pc.Vec3();

    // Push 0 as we are starting our loop from 1 for ease
    nodePathLength.push(0);

    for (i = 1; i < nodes.length; i++) {
        var prevNode = nodes[i - 1];
        var nextNode = nodes[i];

        // Work out the distance between the current node and the one before in the path
        distanceBetween.sub2(prevNode.getPosition(), nextNode.getPosition());
        pathLength += distanceBetween.length();

        nodePathLength.push(pathLength);
    }

    for (i = 0; i < nodes.length; i++) {
        // Calculate the time for the curve key based on the distance of the path to the node
        // and the total path length so the speed of the camera travel stays relatively
        // consistent throughout
        var t = nodePathLength[i] / pathLength;

        var node = nodes[i];

        var pos = node.getPosition();
        this.px.add(t, pos.x);
        this.py.add(t, pos.y);
        this.pz.add(t, pos.z);

        // Create and store a lookAt position based on the node position and the forward direction
        var lookAt = pos.clone().add(node.forward);
        this.tx.add(t, lookAt.x);
        this.ty.add(t, lookAt.y);
        this.tz.add(t, lookAt.z);

        var up = node.up;
        this.ux.add(t, up.x);
        this.uy.add(t, up.y);
        this.uz.add(t, up.z);
    }

    this._pathCreated = true;
};


// landscapeFov.js
var LandscapeFov = pc.createScript('landscapeFov');

LandscapeFov.attributes.add('minAspectRatio', {
    type: 'number',
    default: 0.5625
});

LandscapeFov.attributes.add('maxAspectRatio', {
    type: 'number',
    default: 1.5
});

LandscapeFov.attributes.add('startFov', {
    type: 'number',
    default: 30
});


LandscapeFov.attributes.add('endFov', {
    type: 'number',
    default: 30
});




LandscapeFov.prototype.initialize = function() {
    this.on('attr', this.onResizeCanvas, this);
    this.app.graphicsDevice.on('resizecanvas', this.onResizeCanvas, this);
    this.onResizeCanvas();
};

LandscapeFov.prototype.update = function(dt) {

};


LandscapeFov.prototype.onResizeCanvas = function () {
    this.entity.camera.horizontalFov = true;

    const height = this.app.graphicsDevice.height;
    const width = this.app.graphicsDevice.width;
    const aspectRatio = width / height;
    
    const clampedApectRatio = pc.math.clamp(aspectRatio, this.minAspectRatio, this.maxAspectRatio);
    const aspectRatioFactor = (clampedApectRatio - this.minAspectRatio) / (this.maxAspectRatio - this.minAspectRatio);

    if(aspectRatio >= this.maxAspectRatio) {
        this.entity.camera.fov = this.endFov * aspectRatio / this.maxAspectRatio;
    } else {
        this.entity.camera.fov = pc.math.lerp(this.startFov, this.endFov, aspectRatioFactor);
    }
};

// localStorageController.js
/* jshint esversion: 6 */
var LocalStorageController = pc.createScript('localStorageController');

LocalStorageController.prototype.initialize = function () {
    LocalStorageController.app = this.app;
    LocalStorageController.currentLocalStorage = APIMediator.getStorageObject();

    this.app.on(EventTypes.SAVE_APP, () => LocalStorageController.saveData(), this);
    this.app.on(EventTypes.POSTINITIALIZE, this.unlockLocalStorageForWriting, this);
};


LocalStorageController.prototype.postInitialize = function () {
    LocalStorageController.loadData();
    this.app.fire(EventTypes.SAVEDATA_LOADED);
};

LocalStorageController.prototype.unlockLocalStorageForWriting = function (dt) {
    LocalStorageController._writingAllowed = true;
    if (LocalStorageController._hasPendingWriteRequests) {
        LocalStorageController.saveData();
    }
};

LocalStorageController.getLocalStorage = function () {
    return LocalStorageController.currentLocalStorage;
};

LocalStorageController.prepareDefaultSaveData = function () {
    const defaultSaveData = {};
    defaultSaveData[Constants.Storage.CURRENT_LEVEL] = 1;
    defaultSaveData[Constants.Storage.CHAPTER] = 0;
    defaultSaveData[Constants.Storage.GEMS] = 0;
    defaultSaveData[Constants.Storage.VIBRATION] = true;
    defaultSaveData[Constants.Storage.MUSIC_VOLUME] = 0.5;
    defaultSaveData[Constants.Storage.SFX_VOLUME] = 0.5;
    defaultSaveData[Constants.Storage.LIKES_BOOST_LEVEL] = 1;
    defaultSaveData[Constants.Storage.GEMS_BOOST_LEVEL] = 1;
    defaultSaveData[Constants.Storage.CONCEPT_LOOP] = [];
    defaultSaveData[Constants.Storage.RECENT_MATCH_RESULTS] = []; 
    defaultSaveData[Constants.Storage.UNLOCKABLE_CONCEPTS] = undefined;
    defaultSaveData[Constants.Storage.CONCEPT_UNLOCK_PROGRESS] = 0;
    defaultSaveData[Constants.Storage.CONCEPT_LEVELS] = {};
    defaultSaveData[Constants.Storage.LANGUAGE] = undefined;
    defaultSaveData[Constants.Storage.SHOP_DATA] = undefined;
    defaultSaveData[Constants.Storage.UNLOCKED_CELEBRITIES] = undefined;
    
    return defaultSaveData;
};


LocalStorageController.getActualSaveData = function () {
    const currentSaveData = {};
    currentSaveData[Constants.Storage.CURRENT_LEVEL] = DataManager.getInstance().level;
    currentSaveData[Constants.Storage.CHAPTER] = DataManager.getInstance().chapter;
    currentSaveData[Constants.Storage.GEMS] = DataManager.getInstance().gems;
    currentSaveData[Constants.Storage.VIBRATION] = VibrationManager.getInstance().isVibrationEnabled();
    currentSaveData[Constants.Storage.MUSIC_VOLUME] = SoundController.musicStateLoaded ? SoundController.musicVolume : 1;
    currentSaveData[Constants.Storage.SFX_VOLUME] = SoundController.sfxStateLoaded ? SoundController.sfxVolume : 1;
    currentSaveData[Constants.Storage.LIKES_BOOST_LEVEL] = DataManager.getInstance().likesBoostLevel;
    currentSaveData[Constants.Storage.GEMS_BOOST_LEVEL] = DataManager.getInstance().gemsBoostLevel;
    currentSaveData[Constants.Storage.CONCEPT_LOOP] = ConceptManager.getInstance().getConceptLoop();
    currentSaveData[Constants.Storage.RECENT_MATCH_RESULTS] = DataManager.getInstance().recentMatchResults;
    currentSaveData[Constants.Storage.UNLOCKABLE_CONCEPTS] = ConceptManager.getInstance().getUnlockableConcepts();
    currentSaveData[Constants.Storage.CONCEPT_UNLOCK_PROGRESS] = ConceptManager.getInstance().getNextConceptProgress();
    currentSaveData[Constants.Storage.CONCEPT_LEVELS] = LevelManager.getInstance().getConceptLevelsSaveData();
    currentSaveData[Constants.Storage.LANGUAGE] = LocalizationManager.getInstance().getCurrentLocale();
    currentSaveData[Constants.Storage.SHOP_DATA] = ShopManager.getInstance().getShopSaveData();
    currentSaveData[Constants.Storage.UNLOCKED_CELEBRITIES] = CelebrityManager.getInstance().getSaveData();


    return currentSaveData;
};

LocalStorageController.getSlotKey = function () {
    return Constants.GAME_NAME + '_' + Constants.GAME_VERSION;
};

LocalStorageController.save = function (immediately = true) {
    LocalStorageController.saveData(null, immediately);
}

LocalStorageController.saveData = function (saveDataObject = null, immediately = true) {
    if (!LocalStorageController._writingAllowed) {
        Debug.warn("[localStorage] saving is not allowed until the app has fully initialized");
        return;
    }

    const _performWrite = () => {
        LocalStorageController.lastSaveData = saveDataObject || LocalStorageController.getActualSaveData();
        LocalStorageController.currentLocalStorage.setItem(LocalStorageController.getSlotKey(), JSON.stringify(LocalStorageController.lastSaveData));
        // Debug.warn('[Storage] save', LocalStorageController.lastSaveData);
    }

    if (immediately) {
        _performWrite();
    } else {
        setTimeout(() => {
            _performWrite();
        }, 50);
    }
};

LocalStorageController.loadData = function () {
    var data = LocalStorageController.currentLocalStorage.getItem(LocalStorageController.getSlotKey());
    var dataLoaded = false;

    if (data) {
        try {
            data = JSON.parse(data);
            dataLoaded = true;
        } catch (e) {
            data = LocalStorageController.prepareDefaultSaveData();
            LocalStorageController.saveData(data);
        }
    } else {
        data = LocalStorageController.prepareDefaultSaveData();
        LocalStorageController.saveData(data);
    }

    LocalStorageController.lastSaveData = data;
    // Debug.info('Saved data loaded: ', LocalStorageController.lastSaveData);

    VibrationManager.getInstance().setVibrationEnabled(LocalStorageController.getSavedValue(Constants.Storage.VIBRATION));
};

LocalStorageController.getSavedValue = function (key) {
    if (LocalStorageController.lastSaveData) {
        return LocalStorageController.lastSaveData[key];
    } else {
        console.warn(`getSavedValue: No saved value with key '${key}' was loaded`);
    }
};



// Screen_MainMenu.js
class ScreenMainMenu extends BaseWindow {

    initialize() {
        super.initialize();

        this.levelText = this.entity.findByName('LevelText');

        this.buttonSettings = this.entity.findByName('ButtonSettings');
        this.buttonShop = this.entity.findByName('ButtonShop');
        this.shopNotification = this.buttonShop.findByName('NotificationIcon');
        this.shopNotification.enabled = true;

        this.likesBoostButton = this.entity.findByName('LikesButton');
        this.likesPriceText = this.likesBoostButton.findByName('CostText');
        this.likesLevelText = this.likesBoostButton.findByName('LevelText');
        this.gemsBoostButton = this.entity.findByName('GemsButton');
        this.gemsPriceText = this.gemsBoostButton.findByName('CostText');
        this.gemsLevelText = this.gemsBoostButton.findByName('LevelText');
        this.likesParticleSystem = this.likesBoostButton.findByName('StarParticleSystem');
        this.gemsParticleSystem = this.gemsBoostButton.findByName('StarParticleSystem');

        this.tapToPlayZone = this.entity.findByName('TapToPlayInputZone');
        this.tapToPlayZone.on(EventTypes.BUTTON_PRESSED, this.onPlayPressed, this);


        this.likesBoostButton.on(EventTypes.BUTTON_PRESSED, this.onBoostLikesPressed, this);
        this.gemsBoostButton.on(EventTypes.BUTTON_PRESSED, this.onBoostGemsPressed, this);

        this.buttonShop.on(EventTypes.BUTTON_PRESSED, this.onShopPressed, this);
        this.buttonSettings.on(EventTypes.BUTTON_PRESSED, this.onSettingsPressed, this);

        this.app.on(EventTypes.LEVEL_CHANGED, this.handleLevelChanged, this);
        this.app.on(EventTypes.LANGUAGE_SELECTED, this.handleLanguageChanged, this);

        this.app.on(EventTypes.SHOW_SHOP_TAB_NOTIFICATION_ICON, this.showNotificationIcon, this);
    }


    _initComponents() {
        super._initComponents();
    }

    _onShow() {
        super._onShow();

        this._disableButtons();

        this.updateButtonsVisibility();
        this.updateBoostersVisibility();

        /* just need to reset it once when the game has finished loading */
        if (!this._initialLoadCompleted) {
            LevelController.getInstance().reset();
            this._initialLoadCompleted = true;
        }

        this.initLevel();

        if (LevelController.getInstance().autoStartLevel) {
            this.launchCurrentLevel();
        }
    }

    showNotificationIcon(tabKey, categoryKey) {
        this.shopNotification.enabled = true;
    }

    updateButtonsVisibility() {
        // always enabled as we have language button there
        // this.buttonSettings.enabled = GameConfig.getAttribute('UI', 'enableSettingsMenu') && (APIMediator.areAudioControlsAllowed() || APIMediator.isPrivacyPolicyEnabled() || VibrationManager.getInstance().isVibrationSupported());
    }

    updateBoostersVisibility() {
        const likesPrice = DataManager.getInstance().getNextLikesBoostUpgradePrice();
        const gemsPrice = DataManager.getInstance().getNextGemsBoostUpgradePrice();
        const hasEnoughCoins = DataManager.getInstance().gems > Math.min(likesPrice, gemsPrice);

        this.likesLevelText.element.text = LocalizationManager.getInstance().getLocalizedText('LEVEL {value}').replace('{value}', `${DataManager.getInstance().likesBoostLevel}`);
        this.gemsLevelText.element.text = LocalizationManager.getInstance().getLocalizedText('LEVEL {value}').replace('{value}', `${DataManager.getInstance().gemsBoostLevel}`);
        this.likesPriceText.element.text = `${likesPrice}`;
        this.gemsPriceText.element.text = `${gemsPrice}`;

        if (DataManager.getInstance().level > 1 && hasEnoughCoins) {
            this.likesBoostButton.enabled = true;
            this.gemsBoostButton.enabled = true;
        } else {
            this.likesBoostButton.enabled = false;
            this.gemsBoostButton.enabled = false;
        }
    }

    async initLevel() {
        this.handleLevelChanged(DataManager.getInstance().level);

        CameraController.getInstance().changeCamera(Constants.Cameras.MAIN);

        MainCameraManager.getInstance().startLobbyCameraEase();
    }

    _onAppeared() {
        this._enableButtons();
    }

    _onHide() {
        super._onHide();
    }

    update(dt) {

    }



    handleLevelChanged(value) {
        this.levelText.element.text = LocalizationManager.getInstance().getLocalizedText('Battle {value}').replace('{value}', `${DataManager.getInstance().level}`);
    }

    handleLanguageChanged() {
        this.handleLevelChanged(DataManager.getInstance().level);
        this.updateBoostersVisibility();
    }


    async onPlayPressed() {
        APIMediator.showInterstitialAd('button:mainmenu:play', 'start').then(() => {
            this.launchCurrentLevel();
        });
    }

    async launchCurrentLevel() {
        if (CameraController.getInstance().getActiveCameraName() === Constants.Cameras.MAIN) {
            this._disableButtons();

            await APIMediator.gameStart(DataManager.getInstance().level);

            UIController.getInstance().showWindow(Constants.Screens.GAMEPLAY);
        }
    }


    onBoostGemsPressed() {
        const price = DataManager.getInstance().getNextGemsBoostUpgradePrice();
        if (DataManager.getInstance().gems >= price) {
            DataManager.getInstance().gems -= price;
            DataManager.getInstance().gemsBoostLevel += 1;
            this.app.fire(EventTypes.SHOW_PLAYER_CLOTH_CHANGE_EFFECT);
            this.gemsParticleSystem.particlesystem.stop();
            this.gemsParticleSystem.particlesystem.reset();
            this.gemsParticleSystem.particlesystem.play();
            this.updateBoostersVisibility();
            LocalStorageController.save();
        }
    }

    onBoostLikesPressed() {
        const price = DataManager.getInstance().getNextLikesBoostUpgradePrice();
        if (DataManager.getInstance().gems >= price) {
            DataManager.getInstance().gems -= price;
            DataManager.getInstance().likesBoostLevel += 1;
            this.app.fire(EventTypes.SHOW_PLAYER_CLOTH_CHANGE_EFFECT);
            this.likesParticleSystem.particlesystem.stop();
            this.likesParticleSystem.particlesystem.reset();
            this.likesParticleSystem.particlesystem.play();
            this.updateBoostersVisibility();
            LocalStorageController.save();
        }
    }

    onSettingsPressed() {
        UIController.getInstance().showPopup(Constants.Screens.SETTINGS);
    }


    onShopPressed() {
        this.shopNotification.enabled = false;

        UIController.getInstance().showWindowOverTransition(Constants.Screens.SHOP, {
            inDuration: 0.075,
            outDuration: 0.25,
            callback: () => {

            }
        });
    }


    _disableButtons() {
        // this.buttonPlay.setAvailable(false);
        // this.buttonShop.setAvailable(false);
        // this.buttonDailyChallenge.setAvailable(false);
    }

    _enableButtons() {
        // this.buttonPlay.setAvailable(true);
        // this.buttonShop.setAvailable(true);
        // this.buttonDailyChallenge.setAvailable(true);
    }
}

pc.registerScript(ScreenMainMenu, 'screenMainMenu');

// VibrationManager.js
class VibrationManager {
    static getInstance() {
        if (VibrationManager._instance) return VibrationManager._instance;
        VibrationManager._instance = new VibrationManager();
        return VibrationManager._instance;
    }

    constructor() {
        this.vibrationSupported = window.navigator && typeof window.navigator.vibrate === "function" && pc.platform.touch && !pc.platform.desktop;
        if (!GameConfig.getAttribute('UI', 'enableVibration')) {
            this.vibrationSupported = false;
            Debug.log('Haptic feedback is disabled');
        }
        

        this.vibrationEnabled = true;

        this.LightDuration = 20;
        this.MediumDuration = 40;
        this.HeavyDuration = 80;
        this.LightAmplitude = 40;
        this.MediumAmplitude = 120;
        this.HeavyAmplitude = 255;

        this._selectionPattern = [0, this.LightDuration];
        this._lightimpactPattern = [0, this.LightDuration];
        this._mediumimpactPattern = [0, this.MediumDuration];
        this._heavyImpactPattern = [0, this.HeavyDuration];
        this._successPattern = [0, this.LightDuration, this.LightDuration, this.HeavyDuration];
        this._warningPattern = [0, this.HeavyDuration, this.LightDuration, this.MediumDuration];
        this._failurePattern = [0, this.MediumDuration, this.LightDuration, this.MediumDuration, this.LightDuration, this.HeavyDuration, this.LightDuration, this.LightDuration];

        pc.AppBase.getApplication().on(EventTypes.SAVEDATA_LOADED, this.onSaveDataLoaded, this);
    }

    onSaveDataLoaded() {
        const savedValue = LocalStorageController.getSavedValue(Constants.Storage.VIBRATION);
        this.vibrationEnabled = (typeof savedValue !== "undefined") ? !!savedValue : true;
    }

    isVibrationSupported() {
        return this.vibrationSupported;
    }

    isVibrationEnabled() {
        return this.vibrationEnabled;
    }


    setVibrationEnabled(value) {
        this.vibrationEnabled = value;
    }

    _hapticAllowed() {
        return this.vibrationSupported && this.vibrationEnabled;
    }

    hapticSuccess() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._successPattern);
    }

    hapticFailure() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._failurePattern);
    }

    hapticWarning() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._warningPattern);
    }

    hapticSelection() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._selectionPattern);
    }

    hapticLightImpact() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._lightimpactPattern);
    }

    hapticMediumImpact() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._mediumimpactPattern);
    }
    
    hapticHeavyImpact() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._heavyImpactPattern);
    }

}




// Character.js
var Character = pc.createScript('character');

Character.attributes.add("isPlayer", {
    type: "boolean",
    default: false
})

Character.prototype.initialize = function () {
    this.armatureBone = this.entity.findByName('Armature');
    this.clothesContainer = this.entity.findByName('Clothes');
    this.customBody = this.entity.findByName('body-root');
    this.basicBody = this.entity.findByName('AAA_ROOT_001');
    this.customSkinContainer = this.entity.findByName('CustomSkin');
    this.equippedSkin = null;
    this.basicBikiniTop = this.entity.findByName('AA_Bikini_top');
    this.basicBikiniBottom = this.entity.findByName('AA_bikini_bottom');

    this._basicSkinMaterial = this.basicBody.render.meshInstances.map(mi => mi.material).find(x => x.name.includes('skin'));
    this._basicBikiniTopMaterial = this.basicBikiniTop.render.meshInstances[0].material;
    this._basicSkinMaterial = this.basicBikiniBottom.render.meshInstances[0].material;

    this._currentSkinMaterial = this._basicSkinMaterial;

    this.equippedClothes = new Map();
    this.equippedClothesCorrectness = new Map();
    this.characterName = "";

    this.clothChangeEffect = this.entity.findByName('ClothChangeEffect');
    if (!this.isPlayer) {
        this.clothChangeEffect.enabled = false;
    }

    this.characterUI = this.entity.findByName('CharacterUI');
    this.nameText = this.characterUI.findByName('NameText');
    this.emojiesGroup = this.characterUI.findByName('EmojiesGroup');
    this.starsCounter = this.characterUI.findByName('StarsCounter');
    this.emojiesPlayer = this.emojiesGroup.findByName('EmojiesPlayer');
    this.emojiesOpponent = this.emojiesGroup.findByName('EmojiesOpponent');

    /* methods */
    this.entity.reset = this.reset.bind(this);

    this.entity._addArmatureRecursive = this._addArmatureRecursive.bind(this);

    this.entity.setName = this._setName.bind(this);
    this.entity.showNameText = this._showNameText.bind(this);
    this.entity.hideNameText = this._hideNameText.bind(this);

    this.entity.getEmojiesContainer = this._getEmojiesContainer.bind(this);
    this.entity.showStarsCounter = this._showStarsCounter.bind(this);
    this.entity.hideStarsCounter = this._hideStarsCounter.bind(this);
    this.entity.isPlayer = () => this.isPlayer;

    this.entity.equipClothTemplate = this._equipClothTemplate.bind(this);
    this.entity.equipClothRender = this._equipClothRender.bind(this);
    this.entity.loadDefaultBikiniSet = this._loadDefaultBikiniSet.bind(this);
    this.entity.loadRandomBikiniSet = this._loadRandomBikiniSet.bind(this);
    this.entity.clearAllClothes = this.clearAllClothes.bind(this);
    this.entity.initLevelClothing = this._initLevelClothing.bind(this);
    this.entity.getEquippedClothes = this._getEquippedClothes.bind(this);
    this.entity.getEquippedClothesCorrectness = this._getEquippedClothesCorrectness.bind(this);
    this.entity.instantiateClothesSet = this._instantiateClothesSet.bind(this);

    this.entity.playIdleAnim = this.playIdleAnim.bind(this);
    this.entity.playWalkingAnim = this.playWalkingAnim.bind(this);
    this.entity.playPosingAnim = this.playPosingAnim.bind(this);
    this.entity.playVictoryAnim = this.playVictoryAnim.bind(this);
    this.entity.playDefeatAnim = this.playDefeatAnim.bind(this);
    this.entity.playFinalIdleAnim = this.playFinalIdleAnim.bind(this);
    this.entity.playFinisherAnim = this.playFinisherAnim.bind(this);
    this.entity.playKickedOutAnim = this.playKickedOutAnim.bind(this);
    this.entity.playFinalDanceAnim = this.playFinalDanceAnim.bind(this);
    this.entity.walkToOpponent = this.walkToOpponent.bind(this);

    /* init hidden elements */
    if (!this.emojiesGroup.enabled) this.emojiesGroup.enabled = true;
    if (!this.starsCounter.enabled) this.starsCounter.enabled = true;

    if (this.isPlayer) {
        this.app.on(EventTypes.SHOW_PLAYER_CLOTH_CHANGE_EFFECT, this.showClothChangeEffect, this);
        this.app.on(EventTypes.EQUIP_PLAYER_MODEL_SKIN, this._equipModelSkin, this);
    }
};

Character.prototype.postInitialize = function () {
    this._loadDefaultBikiniSet();
};

Character.prototype.update = function (dt) {

};

Character.prototype.reset = function () {
    this.entity.setLocalEulerAngles(pc.Vec3.ZERO);
    this.entity.setLocalScale(pc.Vec3.ONE);
    this.resetAllBooleans();
};

Character.prototype._loadSavedPlayerPreferences = function () {
    // console.error('loading saved player preferences...');

    const savedModelSkin = ShopManager.getInstance().getSavedPlayerSkin();
    if (savedModelSkin) {
        this._equipModelSkin(savedModelSkin);
    }
};

Character.prototype._loadDefaultBikiniSet = function () {
    const defaultSetData = ShopManager.getInstance().getDefaultBikiniSetData();

    this._equipBikiniSet(Constants.ClothingType.Top, this.entity.findByName('AA_Bikini_top'));
    this._equipBikiniSet(Constants.ClothingType.Bottom, this.entity.findByName('AA_bikini_bottom'));

    this._equipModelSkin(defaultSetData);

    if (this.isPlayer) {
        this._loadSavedPlayerPreferences();
    }
};

Character.prototype._loadRandomBikiniSet = function () {
    this._loadDefaultBikiniSet();

    const bikiniSetData = ShopManager.getInstance().getRandomSkinData();
    this._equipModelSkin(bikiniSetData);
};


Character.prototype._equipModelSkin = async function (skinData) {
    Debug.log('Equipping skin on ' + this.entity.name, skinData?.name);

    const { name, skinType, skinMaterial, bikiniBottomMaterial, bikiniTopMaterial, template } = skinData;

    let targetBody, targetBikiniTop, targetBikiniBottom;
    if (skinType === Constants.SkinType.ExternalTemplate && !template) console.error(`no template set for skin "${name}"!`);
    if (!skinMaterial) console.error(`no skin material set for skin "${name}", using the fallback material instead`);
    if (skinType === Constants.SkinType.ExternalTemplate && template) {
        [this.basicBody.enabled, this.basicBikiniTop.enabled, this.basicBikiniBottom.enabled] = [false, false, false];
        [this.customBody.enabled] = [true];

        await this._equipCustomBody(template);
        [targetBody, targetBikiniTop, targetBikiniBottom] = [this.customBody, null, null];
        this._equipCustomBodyComponents(this.equippedSkin);

    } else {
        this._removeCustomBody();
        [this.basicBody.enabled, this.basicBikiniTop.enabled, this.basicBikiniBottom.enabled] = [true, true, true];
        [this.customBody.enabled] = [false];

        [targetBody, targetBikiniTop, targetBikiniBottom] = [this.basicBody, this.basicBikiniTop, this.basicBikiniBottom];
    }

    /* remember skin material */
    this._currentSkinMaterial = skinMaterial || this._basicSkinMaterial;

    /* replace skin & bikini materials */
    if (this.equippedSkin) this._replaceMaterialRecursive(this.equippedSkin, 'skin', this._currentSkinMaterial);
    if (this._currentSkinMaterial) this._replaceMaterialRecursive(targetBody, 'skin', this._currentSkinMaterial);
    if (targetBikiniTop && bikiniTopMaterial) this._replaceMaterialRecursive(targetBikiniTop, 'bikini', bikiniTopMaterial);
    if (targetBikiniBottom && bikiniBottomMaterial) this._replaceMaterialRecursive(targetBikiniBottom, 'bikini', bikiniBottomMaterial);
};

Character.prototype._equipCustomBody = async function (template) {
    // console.warn('Preloading custom body assets tagged as ' + template.name + '...');
    await AssetsLoader.getInstance().loadByTag(template.name);

    this._removeCustomBody();

    // console.warn('Equipping custom body ' + template.name);
    const instance = template.resource.instantiate();
    this.customSkinContainer.addChild(instance);
    this.equippedSkin = instance;

    /* set root bone */
    this._addArmatureRecursive(this.equippedSkin, this.armatureBone);
};

Character.prototype._removeCustomBody = function () {
    while (this.customSkinContainer.children.length > 0) this.customSkinContainer.children[0].destroy();
    this.equippedSkin = null;
};

Character.prototype._equipCustomBodyComponents = function (equippedSkin) {
    Character.__replaceableClothingTypes = Character.__replaceableClothingTypes || [Constants.ClothingType.Hair, Constants.ClothingType.Dress, Constants.ClothingType.Top, Constants.ClothingType.Bottom, Constants.ClothingType.Shoes, Constants.ClothingType.Accessories];
    equippedSkin.children.forEach(child => {
        for (let clothingType of Character.__replaceableClothingTypes) {
            if (child.name.includes(clothingType)) {
                this._equipBikiniSet(clothingType, child);
                break;
            }
        }
    });
};

Character.prototype._replaceMaterialRecursive = function (entity, materialNameKeyword, targetMaterial) {
    if (!entity || !targetMaterial) return;
    if (entity.render) {
        entity.render.meshInstances.forEach(mi => {
            if (mi.material && mi.material.name.includes(materialNameKeyword)) {
                mi.material = targetMaterial.resource;
            }
        });
    }
    entity.children.forEach(child => this._replaceMaterialRecursive(child, materialNameKeyword, targetMaterial));
};

Character.prototype._initLevelClothing = function (clothingTypes) {
    this.equippedClothesCorrectness.clear();
    for (let clothingType of clothingTypes) {
        this.equippedClothesCorrectness.set(clothingType, Constants.ChoiceCorrectness.Empty);
    }
}

Character.prototype._getEquippedClothes = function () {
    return this.equippedClothes;
};

Character.prototype._getEquippedClothesCorrectness = function () {
    return this.equippedClothesCorrectness;
};


Character.prototype._equipBikiniSet = function (clothingType, setEntity) {
    this.removeClothIfEquipped(clothingType);
    setEntity.enabled = true;
    this.equippedClothes.set(clothingType, setEntity);
};

Character.prototype._prepareForNewClothingRound = function (clothingType) {
    if (clothingType === Constants.ClothingType.Dress) {
        this.removeClothIfEquipped(Constants.ClothingType.Top);
        this.removeClothIfEquipped(Constants.ClothingType.Bottom);
    }
    this.removeClothIfEquipped(clothingType);
};

Character.prototype._equipClothTemplate = function (clothingType, template) {
    // console.warn('[Character] equipping cloth template ' + template.name);

    this._prepareForNewClothingRound(clothingType);

    const instance = template.resource.instantiate();
    this.clothesContainer.addChild(instance);
    this.equippedClothes.set(clothingType, instance);

    const choiceCorrectness = template.name.toLowerCase().includes('wrong') ? Constants.ChoiceCorrectness.Bad : template.name.toLowerCase().includes('celebrity') ?  Constants.ChoiceCorrectness.Celebrity : Constants.ChoiceCorrectness.Good;
    this.equippedClothesCorrectness.set(clothingType, choiceCorrectness);

    /* set root bone */
    this._addArmatureRecursive(instance, this.armatureBone);

    /* replace skin material */
    if (this._currentSkinMaterial) {
        this._replaceMaterialRecursive(instance, 'skin', this._currentSkinMaterial);
    }
};

Character.prototype._addArmatureRecursive = function (entity, armatureBone) {
    /* set root bone */
    entity.children.forEach(child => {
        if (child.render) child.render.rootBone = armatureBone;
        this._addArmatureRecursive(child, armatureBone);
    });
};


Character.prototype._equipClothRender = function (clothingType, render) {
    this._prepareForNewClothingRound(clothingType);

    if (!this.clothesSet) {
        console.error('Clothes set not instantiated on character ' + this.entity.name);
        return;
    }

    const clothingName = render.name;
    const clothingPiece = this.clothesSet.findByName(clothingName);
    if (!clothingPiece) {
        console.error(`Clothing piece ${clothingName} not found in clothes set ${this.clothesSet.name}`);
        return;
    }

    clothingPiece.enabled = true;
    this.equippedClothes.set(clothingType, clothingPiece);

    const choiceCorrectness = clothingName.toLowerCase().includes('wrong') ? Constants.ChoiceCorrectness.Bad : clothingName.toLowerCase().includes('celebrity') ?  Constants.ChoiceCorrectness.Celebrity : Constants.ChoiceCorrectness.Good;
    this.equippedClothesCorrectness.set(clothingType, choiceCorrectness);
};

Character.prototype._instantiateClothesSet = function (template) {
    // console.warn('[Character] instantiating clothes set template ' + template.name);

    const instance = template.resource.instantiate();
    this.clothesContainer.addChild(instance);
    this.clothesSet = instance;

    /* set root bone */
    this._addArmatureRecursive(instance, this.armatureBone);

    /* replace skin material */
    if (this._currentSkinMaterial) {
        this._replaceMaterialRecursive(instance, 'skin', this._currentSkinMaterial);
    }

    /* disable all */
    this.clothesSet.children.forEach(x => x.enabled = false);
};


Character.prototype.removeClothIfEquipped = function (clothingType) {
    const clothing = this.equippedClothes.get(clothingType);
    if (clothing) {
        if (clothing.parent === this.clothesContainer) {
            clothing.destroy();
        } else {
            clothing.enabled = false;
        }
        this.equippedClothes.delete(clothingType);
    }

    if (this.equippedClothesCorrectness.get(clothingType)) {
        this.equippedClothesCorrectness.delete(clothingType);
    }
};

Character.prototype.clearAllClothes = function () {
    const clothingKeys = [...this.equippedClothes.keys()];
    while (clothingKeys.length > 0) {
        const key = clothingKeys.shift();
        this.removeClothIfEquipped(key);
    }
    this.equippedClothesCorrectness.clear();
    this._loadDefaultBikiniSet();
    if (this.clothesSet) {
        this.clothesSet.destroy();
    }
    this.clothesSet = undefined;
};


Character.prototype.walkToOpponent = function () {
    const walkingDuration = 0.5;

    return new Promise((resolve, reject) => {
        this.playWalkingAnim();
        this.entity.tween(this.entity.getLocalEulerAngles())
            .rotate({ x: 0, y: this.isPlayer ? 90 : -90, z: 0 }, 0.2, pc.Linear)
            .onComplete(() => {

                const localPosition = this.entity.getLocalPosition();
                this.entity.tween(localPosition)
                    .to({ x: 0 }, walkingDuration, pc.Linear)
                    .start();

                this.entity.tween(this.entity.getLocalEulerAngles())
                    .rotate({ x: 0, y: 0, z: 0 }, 0.125, pc.SineOut)
                    .delay(walkingDuration - 0.125)
                    .onComplete(() => {
                        this.playFinisherAnim();
                        resolve();
                    })
                    .start();
            })
            .start();
    });
}



/* name */
Character.prototype._setName = function (name) {
    this.characterName = name;
    this.nameText.element.text = this.characterName;
    this.starsCounter.setPlayerName(name);
};

Character.prototype._showNameText = function () {
    this.app.stopAllTweens(this.nameText);
    this.nameText.enabled = true;
    this.nameText.element.opacity = 0;
    this.nameText.tween(this.nameText.element)
        .to({ opacity: 1 }, 0.25, pc.Linear)
        .start();
};

Character.prototype._hideNameText = function () {
    this.nameText.tween(this.nameText.element)
        .to({ opacity: 0 }, 0.5, pc.Linear)
        .onComplete(() => {
            this.nameText.enabled = false;
        })
        .start();
};


Character.prototype._showStarsCounter = function (starsAmount) {
    this.starsCounter.show(starsAmount);
};

Character.prototype._hideStarsCounter = function () {
    this.starsCounter.hide();
};

Character.prototype.showClothChangeEffect = function () {
    if (this.isPlayer) {
        this.app.fire(EventTypes.PLAY_SFX, 'change');
        this.clothChangeEffect.children.forEach(x => {
            x.particlesystem.reset();
            x.particlesystem.play();
        })
    }
};

Character.prototype._getEmojiesContainer = function () {
    if (this.isPlayer) {
        return this.emojiesPlayer;
    } else {
        return this.emojiesOpponent;
    }
}

Character.prototype.resetAllBooleans = function () {
    this.entity.anim.setBoolean('walking', false);
    if (this.isPlayer) {
        PetController.getInstance().playIdleAnim();
    }
}

/* anims */



Character.prototype.playIdleAnim = function () {
    this.resetAllBooleans();
    this.entity.anim.setTrigger('idle', true);
}

Character.prototype.playWalkingAnim = function () {
    this.entity.anim.setBoolean('walking', true);
    if (this.isPlayer) {
        PetController.getInstance().playWalkingAnim();
    }
}

Character.prototype.playPosingAnim = function () {
    this.resetAllBooleans();
    this.entity.anim.setTrigger('posing', true);
}


Character.prototype.playVictoryAnim = function () {
    this.resetAllBooleans();
    this.entity.anim.setTrigger('victory', true);
}


Character.prototype.playDefeatAnim = function () {
    this.entity.tween(this.entity.getLocalEulerAngles())
        .rotate({ x: 0, y: this.isPlayer ? 75 : -75, z: 0 }, 0.2, pc.Linear)
        .onComplete(() => {
            this.resetAllBooleans();
            this.entity.anim.setTrigger('defeat', true);
        })
        .start();
}

Character.prototype.playFinalIdleAnim = function () {
    this.resetAllBooleans();
    this.entity.anim.setTrigger('final_idle', true);
}

Character.prototype.playFinisherAnim = function (forceFinisherTrigger = undefined) {
    this.resetAllBooleans();

    let finisherTrigger = 'bye_sweetie';

    if (forceFinisherTrigger) {
        finisherTrigger = forceFinisherTrigger;
    } else if (this.isPlayer) {
        const activeFinisherData = ShopManager.getInstance().getSavedFinisher();

        if (activeFinisherData) {
            this.app.fire(EventTypes.ACTIVATE_FINISHER, activeFinisherData);
            if (activeFinisherData.animationTriggerKey) finisherTrigger = activeFinisherData.animationTriggerKey;
        }
    }

    this.entity.anim.setTrigger(finisherTrigger, true);
};

Character.prototype.playKickedOutAnim = function () {
    this.resetAllBooleans();
    this.entity.anim.setTrigger('kicked_out', true);

    Utils.wait(1000).then(() => {
        this.entity.setLocalScale(pc.Vec3.ZERO);
        this.playIdleAnim();
    });
};


Character.prototype.playFinalDanceAnim = function () {
    this.resetAllBooleans();
    this.entity.anim.setTrigger('final_dance', true);
};

// LevelController.js
var LevelController = pc.createScript('levelController');

LevelController.attributes.add('walkingSpeed', {
    type: 'number',
    default: 0.025
});

LevelController.attributes.add('roundDecisionDistance', {
    type: 'number',
    default: 5
});


LevelController.attributes.add('roundSlowdownFactor', {
    type: 'number',
    default: 0.15
});


LevelController.getInstance = function () {
    if (!LevelController._instance) console.error('LevelController is not initialized yet');
    return LevelController._instance;
};

LevelController.prototype.initialize = function () {
    LevelController._app = this.app;
    if (!LevelController._instance) {
        LevelController._instance = this;
    }


    this.playersController = this.entity.findByName('PlayerController');

    this.started = false;
    this.finished = false;

    this.speedMultiplier = 0;

    this.progress = 0;
    this.round = 0;
    this.totalRounds = 1;
    this.roundClothingData = [];


    this.selectedPlayerClothes = [];
    this.selectedOpponentClothes = [];

    this.app.on('selectPlayerClothes', this._selectPlayerClothes, this);
    this.app.on('endRound', this._endRound, this);

    /* preload the very first level assets */
    this.loadFirstLevel();
};

LevelController.prototype.postInitialize = function () {
    this.player = PlayerController.getInstance().getPlayerCharacter();
    this.opponent = PlayerController.getInstance().getOpponentCharacter();
    this.opponentNameText = this.opponent.findByName('NameText');
}

LevelController.prototype.update = function (dt) {
    if (this.started && !this.finished) {
        this.updateWalking(dt);
    }
};


LevelController.prototype.reset = function () {
    this.app.fire(EventTypes.LEVEL_RESET);

    Utils.resetAllWaiters();
    this.app.stopAllTweens(this.entity);

    PlayerController.getInstance().reset();
    JuryController.getInstance().reset();

    LikesManager.getInstance().hideGameplayHeart();

    CameraController.getInstance().changeCamera(Constants.Cameras.MAIN);

    this.speedMultiplier = 1;
    this.matchingClothesAmount = 0;

    this.decisionStartZ = 100;
    this.decisionEndZ = 100;
    this.progress = 0;
    this.round = -1;
    this.totalRounds = 1;
    this.roundClothingData = [];

    this.started = false;
    this.finished = false;

    this.player.anim.speed = this.speedMultiplier;
    this.opponent.anim.speed = this.speedMultiplier;
};


LevelController.prototype._endRound = function () {
    if (this.roundEnded) return;
    this.roundEnded = true;
    this.app.fire('hideClothesPanel', this.round);

    this.entity.tween(this)
        .to({ speedMultiplier: 1 }, 0.15, pc.Linear)
        .start();

    if (this.currentPlayerClothes !== -1) {
        LikesManager.getInstance().rewardClothesSelection();
    }

    if (CelebrityManager.getInstance().isCelebrityActive()) {
        if (this.currentPlayerClothesFromCelebrity) {
            Utils.wait(350).then(() => {
                if (this.round < 3) {
                    this.app.fire(EventTypes.SHOW_CELEBRITY_MESSAGE, CelebrityManager.getInstance().getRoundCorrentMessage(this.round), 2.5);
                } else {
                    this.app.fire(EventTypes.SHOW_CELEBRITY_MESSAGE, CelebrityManager.getInstance().getEndMessage());
                }
            });

            DataManager.getInstance().celebrityClothesChosen += 1;
        } else {
            Utils.wait(350).then(() => {
                if (this.round < 3) {
                    this.app.fire(EventTypes.SHOW_CELEBRITY_MESSAGE, CelebrityManager.getInstance().getRoundWrongMessage(this.round), 2.5);
                } else {
                    this.app.fire(EventTypes.SHOW_CELEBRITY_MESSAGE, CelebrityManager.getInstance().getEndMessage());
                }
            });
        }
    }

    this._pickOpponentClothes();
    this._preloadNextRoundClothes();
};

LevelController.prototype._filterCorrectClothingIndices = function (indicesList) {
    let filtered = [];
    indicesList.forEach(index => {
        const variant = this.roundClothingData.variants[index];
        if (variant.render && !variant.render.name.includes('wrong')) {
            filtered.push(index);
        } else if (variant.template && !variant.template.name.includes('wrong')) {
            filtered.push(index);
        }
    });
    return filtered;
};

LevelController.prototype._filterWrongClothingIndices = function (indicesList) {
    let filtered = [];
    indicesList.forEach(index => {
        const variant = this.roundClothingData.variants[index];
        if (variant.render && variant.render.name.includes('wrong')) {
            filtered.push(index);
        } else if (variant.template && variant.template.name.includes('wrong')) {
            filtered.push(index);
        }
    });
    return filtered;
};

LevelController.prototype._pickOpponentClothes = function () {
    let opponentClothingIndex = 0;
    const avoidMatching = this.matchingClothesAmount > 0;
    let possibleOpponentVariants = [0, 1, 2];
    let wrongChoice = false;

    const correctIndices = this._filterCorrectClothingIndices([0, 1, 2]);
    const wrongIndices = this._filterWrongClothingIndices([0, 1, 2]);

    if (CelebrityManager.getInstance().isCelebrityActive()) {
        possibleOpponentVariants = this._filterCorrectClothingIndices([1, 2]);
    } else {
        const aiCorrectAnswerChance = DataManager.getInstance().getAICorrectChoiceChance();
        if (Math.random() <= aiCorrectAnswerChance) {
            possibleOpponentVariants = correctIndices.slice();
            Debug.log('[AI] 🟢 with chance ' + aiCorrectAnswerChance);
        } else {
            wrongChoice = true;
            possibleOpponentVariants = wrongIndices.slice();
            Debug.log('[AI] 🔴 with chance ' + aiCorrectAnswerChance);
        }
    }

    if (avoidMatching && !wrongChoice) possibleOpponentVariants = possibleOpponentVariants.filter(x => x !== this.currentPlayerClothes);
    opponentClothingIndex = Utils.getRandomItem(possibleOpponentVariants);
    if (opponentClothingIndex === this.currentPlayerClothes && this.currentPlayerClothes !== -1) this.matchingClothesAmount += 1;

    if (typeof opponentClothingIndex === 'undefined' || opponentClothingIndex === null) opponentClothingIndex = Utils.getRandomItem([0, 1, 2]);

    this.equipVariant(this.opponent, this.roundClothingData.variants[opponentClothingIndex]);
};

LevelController.prototype._preloadNextRoundClothes = function () {
    //not used anymore
    const nextLevelClothesData = this.levelData.clothes[this.round + 1];
    const assetsList = [];
    if (nextLevelClothesData) {
        const variants = nextLevelClothesData.variants;
        if (variants) {
            variants.forEach(variant => {
                const template = variant.template;
                if (template) {
                    const assets = Array.from(new Set([...this.app.assets.findAll(template.name), ...this.app.assets.findByTag(template.name)]));
                    assetsList.push(...assets);
                }
                const icon = variant.icon;
                if (icon) {
                    assetsList.push(this.app.assets.find(icon.name, 'texture'));
                }
            });
        }
    }
    if (assetsList.length > 0) {
        Debug.log('preloading round assets (' + assetsList.length + ')');
        AssetsLoader.getInstance().loadAssets(assetsList);
    }
};

LevelController.prototype._preloadLevelAssets = async function (levelData) {
    const assetsTag = levelData.clothesSet.name;
    const iconAssets = [...levelData.clothes.map(type => [...type.variants.map(variant => variant.sprite || variant.icon), (type.celebrityVariant.sprite || type.celebrityVariant.icon)].filter(x => !!x))].flat(); //extract icons + sprites assets
    const assetsList = [];
    const assets = Array.from(new Set([...iconAssets, ...this.app.assets.findAll(assetsTag), ...this.app.assets.findByTag(assetsTag)]));
    assetsList.push(...assets);

    return AssetsLoader.getInstance().loadAssets(assetsList);
}


LevelController.prototype._selectPlayerClothes = function (variantIndex, isCelebrityVariant = false) {
    // Debug.log('selected player clothes ' + variantIndex + ' celeb ' + isCelebrityVariant);

    this.currentPlayerClothesFromCelebrity = isCelebrityVariant;
    this.currentPlayerClothes = variantIndex;
    this.selectedPlayerClothes[this.round] = variantIndex;

    this.equipVariant(this.player, isCelebrityVariant ? this.roundClothingData.celebrityVariant : this.roundClothingData.variants[variantIndex]);
};

LevelController.prototype.equipVariant = function (character, variant) {
    if (variant.template) {
        character.equipClothTemplate(this.roundClothingData.clothingType, variant.template);
    } else if (variant.render) {
        character.equipClothRender(this.roundClothingData.clothingType, variant.render);
    } else {
        console.warn('Neither clothing template nor render found')
    }
};

LevelController.prototype.loadFirstLevel = async function () {
    this.app.once(EventTypes.SAVEDATA_LOADED, async () => {
        await LevelController.getInstance().loadLevel(DataManager.getInstance().level, false);
        this.app.fire(EventTypes.LEVEL_CLOTHES_READY);
    });
}

LevelController.prototype.loadLevel = async function (levelNumber, showLoadingScreen = true) {
    this.levelNumber = levelNumber;
    let levelData = await LevelManager.getInstance().getCurrentLevelData(levelNumber);
    if (!levelData) {
        console.warn('No level data found for level #' + levelNumber);
        levelData = await LevelManager.getInstance().getRandomLevelData(); //fallback
    }
    this.levelData = levelData;

    if (this.levelData.clothesSet) {
        if (showLoadingScreen) await LoadingOverlay.show();
        await this._preloadLevelAssets(this.levelData);

        this.player.instantiateClothesSet(this.levelData.clothesSet);
        this.opponent.instantiateClothesSet(this.levelData.clothesSet);

        if (showLoadingScreen) LoadingOverlay.hide();
    } else {
        console.error('no level data!');
    }
}

LevelController.prototype.startCurrentLevel = function () {
    this.autoStartLevel = false;

    Debug.log('starting level ' + this.levelNumber + '...');
    if (!this.levelData) {
        console.error('Can not start the level: no level data found');
        return;
    }
    CelebrityManager.getInstance().reset();

    PlatformManager.getInstance().initLevel(this.levelData);

    this.roundCheckpoints = PlatformManager.getInstance().getRoundCheckpoints();
    this.podiumZ = PlatformManager.getInstance().getPodiumZ();

    this.player.loadDefaultBikiniSet();
    this.opponent.loadRandomBikiniSet();

    this.round = -1;
    this.totalRounds = this.levelData.clothes.length;

    this.player.initLevelClothing(this.levelData.clothes.map(c => c.clothingType));
    this.opponent.initLevelClothing(this.levelData.clothes.map(c => c.clothingType));

    this._preloadNextRoundClothes();

    MainCameraManager.getInstance().completeLobbyCameraEase(1.25);
    MainCameraManager.getInstance().translateLobbyToSearchCamera(1);



    PlayerController.getInstance().walkFromLobby(1.25).then(async () => {

        this.player.playPosingAnim();
        this.opponent.playPosingAnim();


        if (this.levelData.celebrityName && !CelebrityManager.getInstance().isAlreadyCompleted(this.levelData.celebrityName)) {
            CelebrityManager.getInstance().loadCelebrity(this.levelData.celebrityName);
            UIController.getInstance().showPopup(Constants.Screens.CELEBRITY);
            await UIController.getInstance().waitWhenScreenHidden(Constants.Screens.CELEBRITY);
        }

        this.showOpponentSearchAnimation();

        if (CelebrityManager.getInstance().isCelebrityActive()) {
            this.app.fire(EventTypes.SHOW_CELEBRITY_UI);
            Utils.wait(150).then(() => {
                this.app.fire(EventTypes.SHOW_CELEBRITY_MESSAGE, CelebrityManager.getInstance().getEntranceMessage(), 3.5);
            });
        }

        Utils.wait(1750).then(() => {
            this.player.playWalkingAnim();
            this.opponent.playWalkingAnim();
            this.started = true;
            this.finished = false;
            MainCameraManager.getInstance().translateSearchToGameplayCamera(4);
            PlayerController.getInstance().canMove = true;
            this.speedMultiplier = 1;
            this.startMatch();
        })
    });
};

LevelController.prototype.showOpponentSearchAnimation = async function () {
    this.player.setName(LocalizationManager.getInstance().getLocalizedText('You'));
    this.opponent.setName('');

    this.player.showNameText();
    this.opponent.showNameText();


    const names = Utils.shuffle(LocalizationManager.getInstance().getLocalizedText('opponent_names').split(',').slice(0, 15).filter(x => !!x));
    let currentName = '';
    while (names.length > 0) {
        currentName = names.shift();
        this.opponentNameText.element.text = currentName;
        await Utils.wait(80);
    }

    this.opponent.setName(currentName);


    this.player.hideNameText();
    this.opponent.hideNameText();
};

LevelController.prototype.finish = async function () {
    this.finished = true;
    this.speedMultiplier = 1;
    PlayerController.getInstance().canMove = false;

    this.app.fire('hideConcept');

    LikesManager.getInstance().hideGameplayHeart();

    PlayerController.getInstance().walkToPodium();

    /* focusing at opponent */
    await MainCameraManager.getInstance().zoomFinalOpponentStepA();

    MainCameraManager.getInstance().zoomFinalOpponentStepB();

    /* judge them both */
    JuryController.getInstance().judgeCharacters();


    const playerPoints = JuryController.getInstance().getLastPlayerScore();
    // DataManager.getInstance().playerLevelScore = playerPoints;  //Original logic
    // const playerJuryScores =  JuryController.getInstance().lastMyplayerPoints; //Original logic


    const opponentPoints = JuryController.getInstance().getLastOpponentScore();
    // DataManager.getInstance().opponentLevelScore = opponentPoints;  //Original logic
    // const opponentJuryScores = JuryController.getInstance().lastAIPoints;  //Original logic

    await JuryController.getInstance().showEmojis(this.opponent);
    const opponentJuryScores = JuryController.getInstance().splitScoreIntoThreePoints(opponentPoints);
    DataManager.getInstance().opponentLevelScore = opponentJuryScores.reduce((a, b) => a + b, 0);

    await Utils.wait(750);

    JuryController.getInstance().showJuryPoints(opponentJuryScores);
    Utils.wait(650).then(() => this.opponent.showStarsCounter(DataManager.getInstance().opponentLevelScore));

    await Utils.wait(3500);

    /* focusing at player */
    await MainCameraManager.getInstance().zoomFinalPlayerStepA();

    MainCameraManager.getInstance().zoomFinalPlayerStepB();

    await JuryController.getInstance().showEmojis(this.player);
    const playerJuryScores = JuryController.getInstance().splitScoreIntoThreePoints(playerPoints);
    DataManager.getInstance().playerLevelScore = playerJuryScores.reduce((a, b) => a + b, 0);

    await Utils.wait(750);

    JuryController.getInstance().showJuryPoints(playerJuryScores);
    Utils.wait(650).then(() => this.player.showStarsCounter(DataManager.getInstance().playerLevelScore));

    await Utils.wait(3500);

    JuryController.getInstance().hideAllEmojies();

    this.player.hideStarsCounter();
    this.opponent.hideStarsCounter();

    const playerWon = DataManager.getInstance().playerLevelScore >= DataManager.getInstance().opponentLevelScore;
    DataManager.getInstance().lastMatchResultWasVictory = playerWon;
    DataManager.getInstance().saveMatchResult(playerWon);

    /* final battle */
    MainCameraManager.getInstance().showFinalBattle();

    await Utils.wait(350);

    if (playerWon) {
        DataManager.getInstance().increaseAIVictoryChance();
        await this._playPlayerKickOpponentAnim();
    } else {
        DataManager.getInstance().clearAIVictoryChance();
        await this._playOpponentKickPlayerAnim();
    }
};

LevelController.prototype.playHammerMetaGame = async function () {
    const hammerTransitionDuration = 1.0;
    HammerController.getInstance().show();
    MainCameraManager.getInstance().lookAtHammer(hammerTransitionDuration);
    PlayerController.getInstance().movePlayerToHammerGame(hammerTransitionDuration);

    await Utils.wait(hammerTransitionDuration * 1000);

    await HammerController.getInstance().playHeartJumpingAnimation();
    await HammerController.getInstance().playBarFillingAnimation();
}

LevelController.prototype._playPlayerKickOpponentAnim = async function () {
    this.opponent.playDefeatAnim();
    await this.player.walkToOpponent();

    await Utils.wait(450);
    this.opponent.playKickedOutAnim();

    await Utils.wait(1000);
    this.player.playFinalDanceAnim();

    PetController.getInstance().playVictoryAnim();
};

LevelController.prototype._playOpponentKickPlayerAnim = async function () {
    this.player.playDefeatAnim();
    await this.opponent.walkToOpponent();

    await Utils.wait(450);
    this.player.playKickedOutAnim();

    await Utils.wait(1000);
    this.opponent.playFinalDanceAnim();
};


LevelController.prototype.updateWalking = function (dt) {

    const frameDeltaZ = dt * this.walkingSpeed * this.speedMultiplier;
    PlayerController.getInstance().moveForward(frameDeltaZ, this.podiumZ);

    const playersPositionZ = PlayerController.getInstance().getPlayerPosition().z;

    const roundProgressLeft = pc.math.clamp((this.decisionEndZ - playersPositionZ) / this.roundDecisionDistance, 0, 1);
    this.app.fire('roundProgressLeft', roundProgressLeft);

    /* level progress */
    const levelProgress = pc.math.clamp((playersPositionZ - 3.86) / (this.podiumZ - 3.86), 0, 1) * 100;
    APIMediator.sendProgress(levelProgress);

    if (playersPositionZ >= this.podiumZ) {
        this.finishMatch();
    } else if (roundProgressLeft <= 0 && !this.roundEnded) {
        this._endRound();
    } else if (playersPositionZ >= this.roundCheckpoints[this.round + 1]) {
        this.startNextRound();
    }

    /* update anim speed */
    this.player.anim.speed = this.speedMultiplier;
    this.opponent.anim.speed = this.speedMultiplier;
};


LevelController.prototype.startNextRound = function () {
    if (this.round < this.totalRounds) {
        this._startRound(this.round + 1)
    } else {
        this.finishMatch();
    }
};

LevelController.prototype._startRound = function (roundNumber) {
    Debug.log('starting round #' + roundNumber);

    this.roundEnded = false;
    this.round = roundNumber;
    this.decisionStartZ = this.roundCheckpoints[roundNumber] + 0.8;
    this.decisionEndZ = this.decisionStartZ + this.roundDecisionDistance;
    this.currentPlayerClothesFromCelebrity = false;
    this.currentPlayerClothes = -1;
    this.roundClothingData = this.levelData.clothes[this.round];
    this.entity.tween(this)
        .to({ speedMultiplier: this.roundSlowdownFactor }, 0.55, pc.Linear)
        .start();

    this.app.fire('showClothesPanel', this.roundClothingData.variants, this.roundClothingData.celebrityVariant);
    this.app.fire('roundProgressLeft', 1);
}



LevelController.prototype.startMatch = function () {
    LikesManager.getInstance().showGameplayHeart();

    this.app.fire('showConcept', this.levelData.concept);
};



LevelController.prototype.finishMatch = async function () {
    this.speedMultiplier = 0;
    await this.finish();

    const playerWon = DataManager.getInstance().playerLevelScore >= DataManager.getInstance().opponentLevelScore;
    this.app.fire(EventTypes.LEVEL_FINISHED, playerWon);

    if (playerWon) {
        DataManager.getInstance().lastLevelRewardGems = DataManager.getInstance().getGemsReward(DataManager.getInstance().playerLevelScore);// DataManager.getInstance().playerLevelScore * DataManager.getInstance().gemsBoostLevel;
        await APIMediator.gameComplete();
        UIController.getInstance().showWindow(Constants.Screens.VICTORY);
        this.app.fire('particles:finalLeft');
        this.app.fire('particles:finalRight');
    } else {
        await APIMediator.gameOver();
        UIController.getInstance().showWindow(Constants.Screens.DEFEAT);
    }
};

LevelController.prototype.restartLevel = function () {
    LevelController.getInstance().autoStartLevel = true;
    LevelController.getInstance().exitToMainMenu();
}

LevelController.prototype.exitToMainMenu = function (callback) {
    this.app.fire(EventTypes.SHOW_TRANSITION_SCREEN, 0.175, async () => {

        LevelController.getInstance().reset();

        UIController.getInstance().showWindow(Constants.Screens.MAIN_MENU);

        if (callback) {
            callback();
        }

        await LevelController.getInstance().loadLevel(DataManager.getInstance().level);

        this.app.fire(EventTypes.HIDE_TRANSITION_SCREEN, 0.65);
    });
};




// Screen_Gameplay.js
class ScreenGameplay extends BaseWindow {

    initialize() {
        super.initialize();

        this.conceptContainer = this.entity.findByName('ConceptContainer');
        this.optionsPanelContainer = this.entity.findByName('OptionsPanelContainer');
        this.optionsPanel = this.optionsPanelContainer.findByName('OptionsPanel');
        this.optionsContainer = this.optionsPanel.findByName('OptionsContainer');
        this.options = this.optionsContainer.children;
        this.roundProgressMask = this.entity.findByName('TimerMask');
        this.celebrity = this.entity.findByName('Celebrity');

        this.app.on('showConcept', this._showConcept, this);
        this.app.on('hideConcept', this._hideConcept, this);
        this.app.on('showClothesPanel', this._showClothesPanel, this);
        this.app.on('hideClothesPanel', this._hideClothesPanel, this);
        this.app.on('roundProgressLeft', this._updateVisibleProgress, this);
        this.app.on(EventTypes.SHOW_CELEBRITY_UI, this._showCelebrityUI, this);
        this.app.on(EventTypes.HIDE_CELEBRITY_UI, this._hideCelebrityUI, this);
        this.app.on(EventTypes.SHOW_CELEBRITY_MESSAGE, this._showCelebrityMessage, this);
        this.app.on(EventTypes.TWEEN_CELEBRITY_TO_OPTION, this._tweenCelebrityToOption, this);
    }

    _initComponents() {
        super._initComponents();
    }

    _showCelebrityUI() {
        this.celebrity.show();
    }

    _hideCelebrityUI() {
        this.celebrity.hide();
    }

    _tweenCelebrityToLeft() {
        this.celebrity.tweenToLeft();
    }

    _tweenCelebrityToOption(optionEntity) {
        this.celebrity.tweenToOption(optionEntity);
    }

    _showCelebrityMessage(textKey, duration) {
        this.celebrity.tweenToLeft().then(() => {
            this.celebrity.showMessage(textKey, duration);
        })
    }

    _showConcept(conceptType) {
        let targetConceptFound = false;
        this.conceptContainer.children.forEach(child => {
            child.enabled = child.name === conceptType;
            const progressText = child.findByName('BattleCounter');
            if (progressText) progressText.element.text = LocalizationManager.getInstance().getLocalizedText('Battle {value}').replace('{value}', `${DataManager.getInstance().level}`);
            if (child.name === conceptType) targetConceptFound = true;
        });

        if (!targetConceptFound) {
            const lastConcept = this.conceptContainer.children[this.conceptContainer.children.length - 1];
            lastConcept.enabled = true;
            const progressText = lastConcept.findByName('BattleCounter');
            if (progressText) progressText.element.text = LocalizationManager.getInstance().getLocalizedText('Battle {value}').replace('{value}', `${DataManager.getInstance().level}`);
            const conceptNameText = lastConcept.findByName('ConceptText');
            if (conceptNameText) conceptNameText.element.key = `${conceptType}`;
        }

        this.conceptContainer.enabled = true;
        this.conceptContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
    }


    _hideConcept() {
        this.conceptContainer.once(EventTypes.UI_ELEMENT.DISAPPEARED, () => {
            this.conceptContainer.enabled = false;
        });
        this.conceptContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
    }


    _showClothesPanel(variants, celebrityVariant) {
        this._showOptionsSet(variants, celebrityVariant);
    }

    _hideClothesPanel(roundIndex) {
        this.optionsPanel.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
        this._tweenCelebrityToLeft();
    }

    _updateVisibleProgress(value) {
        this.roundProgressMask.element.width = value * 768;
    }



    _onShow() {
        super._onShow();

        this._hideCelebrityUI();

        this.optionsPanel.enabled = false;
        this.conceptContainer.enabled = false;

        /* preload assets here */
        AssetsLoader.getInstance().loadByTag('feedback');
        AssetsLoader.getInstance().loadByTag('concept-ui');
        AssetsLoader.getInstance().loadByTag('jury');

        LevelController.getInstance().startCurrentLevel();
    }

    _onAppeared() {

    }

    _onHide() {
        super._onHide();
    }

    _showOptionsSet(variants, celebrityVariant) {
        const optionsPanels = Utils.shuffle(this.options.slice());

        for (let i = 0; i < variants.length; i++) {
            if (i === 0 && CelebrityManager.getInstance().isCelebrityActive() && celebrityVariant) {
                optionsPanels[i].setClothingVariant(i, celebrityVariant, true);
            } else {
                optionsPanels[i].setClothingVariant(i, variants[i]);
            }
        }
        this.optionsPanel.enabled = true;
        this.optionsPanel.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);

        if (DataManager.getInstance().level === 1 && APIMediator.isTutorialEnabled()) {
            this._showTutorial(optionsPanels);
        } else {
            this.app.fire(EventTypes.HIDE_GAMEPLAY_TUTORIAL_HAND, true);
        }
    }

    _showTutorial(optionsPanels) {
        const correctOptionPanels = optionsPanels.filter(x => x.isCorrectOption());
        const targetOption = Utils.getRandomItem(correctOptionPanels);
        Utils.wait(250).then(() => {
            this.app.fire(EventTypes.SHOW_GAMEPLAY_TUTORIAL_HAND, targetOption.getPosition());
        });
        this.app.once('hideClothesPanel', () => {
            this.app.fire(EventTypes.HIDE_GAMEPLAY_TUTORIAL_HAND);
        });
        this.app.once('selectPlayerClothes', (variantIndex, isCelebrityVariant) => {
            this.app.fire(EventTypes.HIDE_GAMEPLAY_TUTORIAL_HAND);
            const selectedOption = optionsPanels[variantIndex];
            const applyButton = selectedOption.findByName('ButtonApply');
            Utils.wait(350).then(() => {
                this.app.fire(EventTypes.SHOW_GAMEPLAY_TUTORIAL_HAND, applyButton.getPosition());
                this.app.once('endRound', () => {
                    // this._tweenCelebrityToLeft();
                    this.app.fire(EventTypes.HIDE_GAMEPLAY_TUTORIAL_HAND);
                });
            })

        });
    }

    update(dt) {

    }


}

pc.registerScript(ScreenGameplay, 'screenGameplay');

// Screen_Victory.js
class ScreenVictory extends BaseWindow {

    initialize() {
        super.initialize();

        this.gemsContainer = this.entity.findByName('GemsContainer');
        this.gemsAmountText = this.gemsContainer.findByName('GemsAmountText');

        this.continueGroup = this.entity.findByName('ContinueGroup');
        this.buttonContinue = this.continueGroup.findByName('ButtonContinue');

        this.rewardedGroup = this.entity.findByName('RewardedGroup');
        this.buttonRewardedMultiply = this.rewardedGroup.findByName('ButtonRewardedMultiply');
        this.rewardAmountText = this.buttonRewardedMultiply.findByName('RewardAmountText');
        this.buttonNoThanks = this.rewardedGroup.findByName('ButtonNoThanks');
        this.fortuneMultiplier = this.rewardedGroup.findByName('FortuneMultiplierContainer');

        this.buttonRewardedMultiply.on(EventTypes.BUTTON_PRESSED, this.onRewardedMultiplyPressed, this);
        this.buttonNoThanks.on(EventTypes.BUTTON_PRESSED, this.onNoThanksPressed, this);
        this.buttonContinue.on(EventTypes.BUTTON_PRESSED, this.onContinuePressed, this);
    }


    _initComponents() {
        super._initComponents();
    }

    _onShow() {
        super._onShow();

        DataManager.getInstance().resetRewardedAdLimit();

        CelebrityManager.getInstance().markCurrentCelebrityAsCompleted();

        this.app.fire(EventTypes.PLAY_SFX, 'victory');
        DataManager.getInstance().level += 1;
        LocalStorageController.save();

        this._processVictoryTweens();
    }

    _onAppeared() {

    }

    _onHide() {
        super._onHide();
    }


    async _processVictoryTweens() {

        this._rewardedAdWatched = false;
        this.rewardedGroup.enabled = false;
        this.continueGroup.enabled = false;
        this.buttonRewardedMultiply.setAvailable(true);
        this.buttonNoThanks.setAvailable(true);
        this.buttonContinue.setAvailable(true);


        const lastLevelRewardGems = DataManager.getInstance().lastLevelRewardGems;
        if (lastLevelRewardGems > 0) {
            Utils.tweenText(this.gemsAmountText, 0, lastLevelRewardGems, 0.5, 0, pc.Linear, true);
            await Utils.wait(500);

            if (APIMediator.isRewardedAdAvailable('button:results:multiplyReward')) {
                this.continueGroup.enabled = false;
                this.rewardedGroup.enabled = true;
                this.rewardedGroup.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
                this.fortuneMultiplier.start();
            } else {
                this.rewardedGroup.enabled = false;
                this.continueGroup.enabled = true;
                this.continueGroup.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
            }

        } else {
            this.gemsAmountText.element.text = `${lastLevelRewardGems}`;
            await Utils.wait(750);

            this.rewardedGroup.enabled = false;
            this.continueGroup.enabled = true;
            this.continueGroup.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
        }
    }



    update(dt) {
        if (this.rewardedGroup.enabled) {
            const multiplier = this.fortuneMultiplier.getCurrentMultiplierValue();
            this.rewardAmountText.element.text = `${Math.floor(DataManager.getInstance().lastLevelRewardGems * multiplier)}`;
        }
    }

    async pickupGemsAndExit(multiplier = 1) {
        const lastLevelRewardGems = DataManager.getInstance().lastLevelRewardGems * multiplier;
        if (lastLevelRewardGems > 0) {
            this.gemsAmountText.element.text = `${lastLevelRewardGems}`;
            Utils.wait(500).then(() => this.gemsContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR));
            VibrationManager.getInstance().hapticFailure();
            await GemCounter.getInstance().spawnAndPickupGems(this.gemsContainer.getPosition(), lastLevelRewardGems, 1.5);
        } else {
            this.gemsContainer.enabled = false;
        }

        await this.exit();
        LocalStorageController.save();
    }

    async exit() {
        this.rewardedGroup.enabled = false;
        this.continueGroup.enabled = false;

        LocalStorageController.save();

        if (DataManager.getInstance().lastMatchResultWasVictory) {
            UIController.getInstance().hide(Constants.Screens.VICTORY);
            await ConceptManager.getInstance().unlockNextConceptIfNeeded();
            await LevelController.getInstance().playHammerMetaGame();
        }

        LevelController.getInstance().exitToMainMenu();
    }


    async onRewardedMultiplyPressed() {
        this.buttonRewardedMultiply.setAvailable(false);
        this.buttonNoThanks.setAvailable(false);

        const multiplier = this.fortuneMultiplier.stopAndGetResult();

        const result = await APIMediator.watchRewardedVideo('button:results:multiplyReward');
        if (result) {
            this._rewardedAdWatched = true;

            Utils.wait(350).then(async () => {
                const increasedGemsValue = DataManager.getInstance().lastLevelRewardGems * multiplier;

                Utils.tweenText(this.gemsAmountText, DataManager.getInstance().lastLevelRewardGems, increasedGemsValue, 0.5, 0, pc.SineOut, true);
                await Utils.wait(500);

                this.rewardedGroup.fire(EventTypes.UI_ELEMENT.DISAPPEAR);

                await this.pickupGemsAndExit(multiplier);
            });
        } else {
            if (!APIMediator.isRewardedAdAvailable('button:results:multiplyReward')) {
                this.rewardedGroup.enabled = false;
                this.continueGroup.enabled = true;
                this.continueGroup.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
            } else {
                this.fortuneMultiplier.start();
                this.buttonRewardedMultiply.setAvailable(true);
                this.buttonNoThanks.setAvailable(true);
            }
        }
    }

    async onNoThanksPressed() {
        this.buttonRewardedMultiply.setAvailable(false);
        this.buttonNoThanks.setAvailable(false);

        this.rewardedGroup.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
        await this.pickupGemsAndExit(1.0);
    }

    async onContinuePressed() {
        this.buttonContinue.setAvailable(false);
        this.continueGroup.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
        await this.pickupGemsAndExit(1.0);
    }
}

pc.registerScript(ScreenVictory, 'screenVictory');

// option.js
var Option = pc.createScript('option');

Option.prototype.initialize = function () {
    this.backgroundSelected = this.entity.findByName('BackgroundSelected');
    this.backgroundNotSelected = this.entity.findByName('BackgroundNotSelected');
    this.optionIcon = this.entity.findByName('OptionIcon');
    this.celebrityPosition = this.entity.findByName('CelebrityPosition');
    this.celebrityFrame = this.entity.findByName('CelebrityFrame');
    this.herChoice = this.entity.findByName('HerChoiceText');
    this.optionIndex = 0;

    this._celebrityVariant = false;

    this.applyButton = this.entity.findByName('ButtonApply');
    this.entity.applyButton = this.applyButton;

    this.entity.setSelected = (value) => {
        this.applyButton.enabled = value;
        this.backgroundSelected.enabled = value;
        this.backgroundNotSelected.enabled = !value;
    };

    this.entity.setSelected(false);

    this.entity.setClothingVariant = this._setClothingVariant.bind(this);
    this.entity.isCorrectOption = this._isCorrectOption.bind(this);
    this.entity.isCelebrityVariant = this._isCelebrityVariant.bind(this);

    this.entity.on(EventTypes.BUTTON_PRESSED, this.onOptionSelected, this);
    this.applyButton.on(EventTypes.BUTTON_PRESSED, this.onApplyPressed, this);
};

Option.prototype.onOptionSelected = function () {
    this.entity.parent.children.forEach(c => c.setSelected(c === this.entity));
    this.app.fire('selectPlayerClothes', this.optionIndex, this._celebrityVariant);
    this.app.fire(EventTypes.PLAY_SFX, 'cloth_selection');
}

Option.prototype.onApplyPressed = function () {
    this.onOptionSelected();
    this.app.fire('endRound');
    this.app.fire(EventTypes.SHOW_PLAYER_CLOTH_CHANGE_EFFECT);

    if(this._optionCorrect) {
        this.app.fire(EventTypes.SHOW_FEEDBACK_EFFECT);
    }
};


Option.prototype._setClothingVariant = function (index, variantObject, isCelebrityVariant = false) {
    this.optionIndex = index;
    this._celebrityVariant = isCelebrityVariant;



    if (variantObject.icon) {
        this.optionIcon.element.textureAsset = variantObject.icon.id;
    } else if (variantObject.sprite) {
        this.optionIcon.element.spriteAsset = variantObject.sprite.id;
    }

    if (variantObject.template) {
        this._optionCorrect = !variantObject.template.name.toLowerCase().includes('wrong');
    } else if (variantObject.render) {
        this._optionCorrect = !variantObject.render.name.toLowerCase().includes('wrong');
    } else {
        console.warn('Can not determine variant correctness');
        this._optionCorrect = true;
    }

    if (this._celebrityVariant) {
        this._optionCorrect = true;
        this.celebrityFrame.enabled = true;
        Utils.wait(100).then(() => {
            this.app.fire(EventTypes.TWEEN_CELEBRITY_TO_OPTION, this.celebrityPosition);
            Utils.wait(250).then(() => {
                this.herChoice.enabled = true;
            });
        });
    } else {
        this.celebrityFrame.enabled = false;
        this.herChoice.enabled = false;
    }

    this.entity.setSelected(false);
};



Option.prototype._isCelebrityVariant = function () {
    return this._celebrityVariant;
};

Option.prototype._isCorrectOption = function () {
    return this._optionCorrect;
};


Option.prototype.update = function (dt) {

};


// MainCameraManager.js
var MainCameraManager = pc.createScript('mainCameraManager');

MainCameraManager.attributes.add('cameraParent', {
    type: 'entity'
});


MainCameraManager.attributes.add('cameraPivot', {
    type: 'entity'
});


MainCameraManager.attributes.add('mainCamera', {
    type: 'entity'
});

MainCameraManager.attributes.add('juryContainer', {
    type: 'entity'
});



MainCameraManager.attributes.add('rootStartPosition', {
    type: 'vec3',
    default: [0, 0, -3.161]
});


MainCameraManager.attributes.add('lobbyCameraPosition', {
    type: 'vec3',
    default: [-3.63, 3.45, -4.08]
});

MainCameraManager.attributes.add('lobbyCameraRotation', {
    type: 'vec3',
    default: [-16.8, -39.4, 0.0]
});


MainCameraManager.attributes.add('gameplayCameraPosition', {
    type: 'vec3',
    default: [-3.63, 3.45, -4.08]
});

MainCameraManager.attributes.add('gameplayCameraRotation', {
    type: 'vec3',
    default: [-16.8, -39.4, 0.0]
});


MainCameraManager.attributes.add('opponentSearchCameraPosition', {
    type: 'vec3',
    default: [-4.35, 3.93, -4.13]
});

MainCameraManager.attributes.add('opponentSearchCameraRotation', {
    type: 'vec3',
    default: [-16.8, -42.85, 0.0]
});



MainCameraManager.attributes.add('aiFocusDuration', {
    type: 'number',
    default: 2
});


MainCameraManager.attributes.add('playerFocusDuration', {
    type: 'number',
    default: 2
});


MainCameraManager.attributes.add('battleFocusDuration', {
    type: 'number',
    default: 0.6
});



MainCameraManager.attributes.add('aiPlayerLookDuration', {
    type: 'number',
    default: 5
});

MainCameraManager.attributes.add('myPlayerLookDuration', {
    type: 'number',
    default: 5
});

MainCameraManager.attributes.add('hammerCameraPosition', {
    type: 'vec3',
    default: [-0.52, 4.13, 16.2]
});

MainCameraManager.attributes.add('hammerCameraRotation', {
    type: 'vec3',
    default: [0.458, 13.0, -0.052]
});


MainCameraManager.getInstance = function () {
    if (!MainCameraManager._instance) console.error('AssetsLoader is not initialized yet');
    return MainCameraManager._instance;
};


MainCameraManager.prototype.initialize = function () {
    MainCameraManager._app = this.app;
    if (!MainCameraManager._instance) {
        MainCameraManager._instance = this;
    }

    this.cameraRoot = this.entity;

    this.cameraPivotPositionTween = null;
    this.cameraPivotRotationTween = null;
    this.cameraParentPositionTween = null;
    this.cameraParentRotationTween = null;
};

MainCameraManager.prototype.reset = function () {
    this.resetLobbyTweens();
    this.resetLevelEndTweens();

    this.cameraParent.setLocalPosition(pc.Vec3.ZERO);
    this.cameraParent.setLocalRotation(pc.Quat.IDENTITY);

    this.cameraPivot.setLocalPosition(pc.Vec3.ZERO);
    this.cameraPivot.setLocalRotation(pc.Quat.IDENTITY);

    this.cameraRoot.setLocalPosition(this.rootStartPosition);

    this.mainCamera.setLocalPosition(this.lobbyCameraPosition);
    this.mainCamera.setLocalEulerAngles(this.lobbyCameraRotation);

    this.cameraPivot.setLocalPosition(0.18, 0, 0);
    this.cameraPivot.setLocalRotation(pc.Quat.IDENTITY);

    this.cameraParent.setLocalPosition(-1.14, 0, 0);
    this.cameraParent.setLocalEulerAngles(0, -10, 0);
};


/* lobby tween */
MainCameraManager.prototype.startLobbyCameraEase = function () {
    this.reset();

    this.cameraParentRotationTween = this.cameraParent.tween(this.cameraParent.getLocalEulerAngles())
        .rotate({ x: 0, y: 5, z: 0 }, 40, pc.SineOut)
        .start();
};


MainCameraManager.prototype.completeLobbyCameraEase = function (duration) {
    Utils.stopTween(this.cameraPivotPositionTween, this.cameraPivotRotationTween, this.cameraParentPositionTween, this.cameraParentRotationTween);

    PlayerController.getInstance().isLobbyWalk = true;

    this.cameraPivotPositionTween = this.cameraPivot.tween(this.cameraPivot.getLocalPosition())
        .to(pc.Vec3.ZERO, duration, pc.SineIn)
        .onComplete(() => {
            PlayerController.getInstance().isLobbyWalk = false;
        })
        .start();

    this.cameraPivotRotationTween = this.cameraPivot.tween(this.cameraPivot.getLocalEulerAngles())
        .rotate(pc.Vec3.ZERO, duration, pc.SineIn)
        .start();

    const parentLocalPos = this.cameraParent.getLocalPosition();
    this.cameraParentPositionTween = this.cameraParent.tween(this.cameraParent.getLocalPosition())
        .to({ x: 0 }, duration, pc.SineIn)
        .start();

    this.cameraParentRotationTween = this.cameraParent.tween(this.cameraParent.getLocalEulerAngles())
        .rotate(pc.Vec3.ZERO, duration, pc.SineIn)
        .start();
};


MainCameraManager.prototype.translateLobbyToSearchCamera = function (duration) {
    Utils.stopTween(this.anzuMainCameraMoveTween, this.anzuMainCameraRotateTween);

    this.anzuMainCameraMoveTween = this.mainCamera.tween(this.mainCamera.getLocalPosition())
        .to(this.opponentSearchCameraPosition, duration, pc.Linear)
        .start();

    /* rotation */
    this.levelEndRotationTween = this.mainCamera.tween(this.mainCamera.getLocalEulerAngles())
        .rotate(this.opponentSearchCameraRotation, duration, pc.Linear)
        .start();
};

MainCameraManager.prototype.translateSearchToGameplayCamera = function (duration) {
    Utils.stopTween(this.anzuMainCameraMoveTween, this.anzuMainCameraRotateTween);

    this.anzuMainCameraMoveTween = this.mainCamera.tween(this.mainCamera.getLocalPosition())
        .to(this.gameplayCameraPosition, duration, pc.Linear)
        .start();

    /* rotation */
    this.levelEndRotationTween = this.mainCamera.tween(this.mainCamera.getLocalEulerAngles())
        .rotate(this.gameplayCameraRotation, duration, pc.Linear)
        .start();
};


MainCameraManager.prototype.resetLobbyTweens = function () {
    Utils.stopTween(this.cameraPivotPositionTween, this.cameraPivotRotationTween, this.cameraParentPositionTween, this.cameraParentRotationTween);
};


/* level end tween */


MainCameraManager.prototype.lookAtAICharacter = function (targetPosition) {
    const pivotPosition = this.cameraPivot.getPosition();
    const newPosition = targetPosition.clone();

    newPosition.x = targetPosition.x;
    this.cameraParent.setPosition(newPosition);

    this.cameraPivot.setPosition(pivotPosition);

    Utils.stopTween(this.aiPlayerLookTween, this.myPlayerLookTween);

    const cameraParentAngles = this.cameraParent.getLocalEulerAngles();
    this.aiPlayerLookTween = this.cameraParent.tween(cameraParentAngles)
        .rotate({ x: 0, y: 9, z: 0 }, this.aiPlayerLookDuration, pc.Linear)
        .start();

};


MainCameraManager.prototype.lookAtMyCharacter = function (targetPosition) {
    const pivotPosition = this.cameraPivot.getPosition();
    const newPosition = targetPosition.clone();

    newPosition.x = targetPosition.x;
    this.cameraParent.setPosition(newPosition);

    this.cameraPivot.setPosition(pivotPosition);

    Utils.stopTween(this.aiPlayerLookTween, this.myPlayerLookTween);

    const cameraParentAngles = this.cameraParent.getLocalEulerAngles();
    this.myPlayerLookTween = this.cameraParent.tween(cameraParentAngles)
        .rotate({ x: 0, y: 0, z: 0 }, this.myPlayerLookDuration, pc.Linear)
        .start();
};

MainCameraManager.prototype.resetLevelEndTweens = function () {
    Utils.stopTween(this.aiPlayerLookTween, this.myPlayerLookTween, this.levelEndPositionTween, this.levelEndRotationTween);
};


MainCameraManager.prototype.handleLevelEndTween = function (target, xOffset, duration, resetParents = false, moveEase = pc.SineOut, rotateEase = pc.SineOut) {
    Utils.stopTween(this.levelEndPositionTween, this.levelEndRotationTween);

    let targetPosition = target.getPosition().add(xOffset);
    if (resetParents) {
        targetPosition = new pc.Vec3(0, targetPosition.y, targetPosition.z);
    }

    const targetLocalPosition = Utils.worldToLocalPosition(this.mainCamera, targetPosition);
    this.levelEndPositionTween = this.mainCamera.tween(this.mainCamera.getLocalPosition())
        .to(targetLocalPosition, duration, moveEase)
        .start();

    /* rotation */
    const targetLocalEulerAngles = Utils.worldToLocalEulerAngles(this.mainCamera, target.getEulerAngles());
    this.levelEndRotationTween = this.mainCamera.tween(this.mainCamera.getLocalEulerAngles())
        .rotate(targetLocalEulerAngles, duration, rotateEase)
        .start();

    if (resetParents) {
        Utils.stopTween(this.parentPosTween, this.parentRotTween, this.pivotPosTween, this.pivotRotTween);

        const resetDuration = duration;

        this.parentPosTween = this.cameraParent.tween(this.cameraParent.getLocalPosition())
            .to(pc.Vec3.ZERO, resetDuration, pc.Linear)
            .start();

        this.parentRotTween = this.cameraParent.tween(this.cameraParent.getLocalEulerAngles())
            .rotate(pc.Vec3.ZERO, resetDuration, pc.Linear)
            .start();

        this.pivotPosTween = this.cameraPivot.tween(this.cameraPivot.getLocalPosition())
            .to(pc.Vec3.ZERO, resetDuration, pc.Linear)
            .start();

        this.pivotRotTween = this.cameraPivot.tween(this.cameraPivot.getLocalEulerAngles())
            .rotate(pc.Vec3.ZERO, resetDuration, pc.Linear)
            .start();
    }
};



MainCameraManager.prototype.zoomFinalOpponentStepA = async function () {
    this.resetLobbyTweens();
    this.resetLevelEndTweens();

    this.handleLevelEndTween(PlatformManager.getInstance().aiPosingCameraPos, new pc.Vec3(1, 0, 1), this.aiFocusDuration);
    await Utils.wait(this.aiFocusDuration * 1000);
};

MainCameraManager.prototype.zoomFinalOpponentStepB = async function () {
    this.lookAtAICharacter(PlatformManager.getInstance().aiTarget.getPosition());
    await Utils.wait(this.aiPlayerLookDuration * 1000);
};


MainCameraManager.prototype.zoomFinalPlayerStepA = async function () {
    this.resetLobbyTweens();
    this.resetLevelEndTweens();

    this.handleLevelEndTween(PlatformManager.getInstance().playerPosingCameraPos, new pc.Vec3(-0.6, 0, 1), this.playerFocusDuration);
    await Utils.wait(this.playerFocusDuration * 1000);
};

MainCameraManager.prototype.zoomFinalPlayerStepB = async function () {
    this.lookAtMyCharacter(PlatformManager.getInstance().playerTarget.getPosition());
    await Utils.wait(this.myPlayerLookDuration * 1000);
};



MainCameraManager.prototype.showFinalBattle = async function () {
    this.resetLobbyTweens();
    this.resetLevelEndTweens();

    this.handleLevelEndTween(PlatformManager.getInstance().battleCameraPos, new pc.Vec3(0, -0.5, 0), this.battleFocusDuration);
    await Utils.wait(this.battleFocusDuration * 1000);
};


MainCameraManager.prototype.lookAtHammer = async function (duration = 1.0) {
    Utils.stopTween(this.levelEndPositionTween, this.levelEndRotationTween);

    /* position */
    this.levelEndPositionTween = this.mainCamera.tween(this.mainCamera.getLocalPosition())
        .to(this.hammerCameraPosition, duration, pc.SineOut)
        .start();

    /* rotation */
    this.levelEndRotationTween = this.mainCamera.tween(this.mainCamera.getLocalEulerAngles())
        .rotate(this.hammerCameraRotation, duration, pc.SineOut)
        .start();

    await Utils.wait(duration * 1000);
}


/** following */

MainCameraManager.prototype.followPlayerDuringLobbyExit = function () {
    const playerContainerPosition = PlayerController.getInstance().getPlayerPosition();
    const myPlayerPosition = PlayerController.getInstance().getPlayerCharacterPosition();

    this._followTargetPosition = this._followTargetPosition || new pc.Vec3();
    this._followTargetPosition.set(playerContainerPosition.x, playerContainerPosition.y, myPlayerPosition.z);
    this.cameraRoot.setPosition(this._followTargetPosition);
};

MainCameraManager.prototype.followPlayerDuringGameplay = function () {
    this.cameraRoot.setPosition(PlayerController.getInstance().getPlayerPosition());
};


MainCameraManager.prototype.followHammerGameIndicator = function (targetY, duration, delay, ease) {
    this.levelEndPositionTween = this.mainCamera.tween(this.mainCamera.getLocalPosition())
        .to({ y: targetY }, duration, ease)
        .delay(delay)
        .start();
};

/* camera helpers */
MainCameraManager.prototype.getCameraWorldPosition = function () {
    return this.mainCamera.getPosition();
}

/* jury */
MainCameraManager.prototype.getJuryContainerPosition = function () {
    return this.juryContainer.getPosition();
}

MainCameraManager.prototype.getJuryContainerRotation = function () {
    return this.juryContainer.getRotation();
}

/* update */

MainCameraManager.prototype.update = function (dt) {

};

MainCameraManager.prototype.postUpdate = function (dt) {
    if (PlayerController.getInstance().isLobbyWalk) {
        this.followPlayerDuringLobbyExit();
    } else if (PlayerController.getInstance().canMove) {
        this.followPlayerDuringGameplay();
    }
};

// ParticleSystemTrigger.js
var ParticleSystemTrigger = pc.createScript('particleSystemTrigger');

ParticleSystemTrigger.attributes.add('eventKey', {
    type: 'string'
});

ParticleSystemTrigger.prototype.initialize = function() {
    if(!this.eventKey) return console.warn(`Particle System [${this.entity.path}] doesn't have trigger key set`);

    this.app.on(this.eventKey, this.burstParticles, this);
};


ParticleSystemTrigger.prototype.burstParticles = function() {
    this.entity.particlesystem.reset();
    this.entity.particlesystem.play();
};

ParticleSystemTrigger.prototype.update = function(dt) {

};


// LevelData.js
var LevelData = pc.createScript('levelData');


function mapEnum(_enum) {
    var reverseLookup = {};
    var result = [];
    for (var value in _enum) {
        if (!_enum.hasOwnProperty(value)) continue;
        var enumEntry = {};
        enumEntry[value] = _enum[value];
        result.push(enumEntry);
        reverseLookup[_enum[value]] = value;
    }
    _enum.toString = function (value) { return reverseLookup[value]; };
    return result;
}

const LimitedConcepts = {
    NightClub: "NightClub",
    Sport: "Sport",
    Gala: "Gala",
    Formal: "Formal",
    Date: "Date",
    Beach: "Beach",
    Eighties: "Eighties",
    PyjamaParty: "PyjamaParty",
    Bohemian: "Bohemian",
    School: "School",
    Winter: "Winter",
    Masculine: "Masculine",
    Spring: "Spring",
    Fifties: "Fifties",
    Teen: "Teen",
    Christmas: "Christmas",
    Western: "Western",
    Cyberpunk: "Cyberpunk",
    Halloween: "Halloween",
    Festival: "Festival",

    // --- IAP
    Warrior: "Warrior",
    Tribal: "Tribal",
    Kpop: "Kpop",
    Gothic: "Gothic",
    Hiphop: "Hiphop",
    UpperClass: "UpperClass",
    Military: "Military",
    Cosplay: "Cosplay",
    Princess: "Princess",

    // --- ExpertConceptOfferUi
    FlowerFairy: "FlowerFairy",
    NatureFairy: "NatureFairy",
    Foodie: "Foodie",
    FruitStyle: "FruitStyle",
    Centaurs: "Centaurs",
    Animals: "Animals", 
    Sailor: "Sailor",
    Doll: "Doll",
    Parisian: "Parisian",
    Greek: "Greek",

    // --- IAP Expansion V2
    Prom: "Prom",
    Futuristic: "Futuristic",
    Astrology: "Astrology",
    Jeans: "Jeans",
    Pirate: "Pirate",
    FairyTales: "FairyTales",
    Fall: "Fall",
    BlackLace: "BlackLace",
    Circus: "Circus",

    // --- Chest
    AvantGarde: "AvantGarde",
    Bridal: "Bridal",
    FarEast: "FarEast",
    Fighter: "Fighter",
    Glitter: "Glitter",
    Hawaiian: "Hawaiian",
    Latino: "Latino",
    Mermaid: "Mermaid",
    OfficeLife: "OfficeLife",
    PinkShowGirl: "PinkShowGirl",
    RockAndRoll: "RockAndRoll",
    SpaceLife: "SpaceLife",

    // coming soon
    FashionWeek: "FashionWeek",
    Viking: "Viking",
    OldMoney: "OldMoney"

};

const ClothingType = {
    Hair: "Hair",
    Dress: "Dress",
    Top: "Top",
    Bottom: "Bottom",
    Shoes: "Shoes",
    Accessories: "Accessories",
};


LevelData.attributes.add('presetName', {
    type: 'string',
    default: ''
});

LevelData.attributes.add('concept', {
    name: 'concept',
    type: 'string',
    enum: mapEnum(LimitedConcepts),
    default: LimitedConcepts.NightClub
});

LevelData.attributes.add('celebrityName', {
    type: 'string',
    default: ''
});


LevelData.attributes.add('clothesSetTemplate', {
    title: 'Clothes set (template)',
    type: 'asset',
    assetType: 'template'
});

const _CLOTHING_TYPES_ = mapEnum(ClothingType);

LevelData.attributes.add('clothes', {
    type: 'json',
    schema: [{
        name: 'clothingType',
        type: 'string',
        enum: _CLOTHING_TYPES_,
        default: ClothingType.Top
    }, {
        name: 'template_A',
        type: 'asset',
        assetType: 'template'
    }, {
        name: 'icon_A',
        type: 'asset',
        assetType: 'texture'
    }, {
        name: 'template_B',
        type: 'asset',
        assetType: 'template'
    }, {
        name: 'icon_B',
        type: 'asset',
        assetType: 'texture'
    }, {
        name: 'template_C',
        type: 'asset',
        assetType: 'template'
    }, {
        name: 'icon_C',
        type: 'asset',
        assetType: 'texture'
    }, {
        name: 'template_Celebrity',
        type: 'asset',
        assetType: 'template'
    }, {
        name: 'icon_Celebrity',
        type: 'asset',
        assetType: 'texture'
    }],

    array: true
});

LevelData.attributes.add('clothesV2', {
    title: 'clothes (single template)',
    type: 'json',
    schema: [{
        name: 'clothingType',
        type: 'string',
        enum: _CLOTHING_TYPES_,
        default: ClothingType.Top
    }, {
        name: 'render_A',
        type: 'asset',
        assetType: 'render'
    }, {
        name: 'sprite_A',
        type: 'asset',
        assetType: 'sprite'
    }, {
        name: 'render_B',
        type: 'asset',
        assetType: 'render'
    }, {
        name: 'sprite_B',
        type: 'asset',
        assetType: 'sprite'
    }, {
        name: 'render_C',
        type: 'asset',
        assetType: 'render'
    }, {
        name: 'sprite_C',
        type: 'asset',
        assetType: 'sprite'
    }, {
        name: 'render_Celebrity',
        type: 'asset',
        assetType: 'render'
    }, {
        name: 'sprite_Celebrity',
        type: 'asset',
        assetType: 'sprite'
    }],

    array: true
});

LevelData.prototype.initialize = function () {
    if(this.clothesV2.length > 0 && !this.clothesSetTemplate) {
        console.error('No clothes set template found for level ' + this.entity.name);
    }
    this.entity.getDataObject = () => this._prepareDataObject();

};

LevelData.prototype.postInitialize = function () {
    this.entity._levelDataReady = true;
    this.entity.fire('levelDataReady');
};


LevelData.prototype._prepareDataObject = function () {
    const clothesData = this.clothes.map(record => {
        return {
            clothingType: record.clothingType,
            variants: [
                {
                    template: record.template_A,
                    icon: record.icon_A,
                },
                {
                    template: record.template_B,
                    icon: record.icon_B,
                },
                {
                    template: record.template_C,
                    icon: record.icon_C,
                },
            ],
            celebrityVariant: {
                template: record.template_Celebrity,
                icon: record.icon_Celebrity,
            }
        }
    });

    const clothesV2Data = this.clothesV2.map(record => {
        return {
            clothingType: record.clothingType,
            variants: [
                {
                    render: record.render_A,
                    sprite: record.sprite_A,
                },
                {
                    render: record.render_B,
                    sprite: record.sprite_B,
                },
                {
                    render: record.render_C,
                    sprite: record.sprite_C,
                },
            ],
            celebrityVariant: {
                render: record.render_Celebrity,
                sprite: record.sprite_Celebrity,
            }
        }
    });


    const _dataObject = {
        celebrityName: this.celebrityName,
        presetName: this.presetName,
        concept: this.concept,
        clothesSet: this.clothesSetTemplate,
        clothes: clothesV2Data.length > 0 ? clothesV2Data : clothesData
    };

    return _dataObject;
}


// FeedbackEffect.js
var FeedbackEffect = pc.createScript('feedbackEffect');

FeedbackEffect.prototype.initialize = function () {
    feedbackSpritesContainer = this.entity.findByName('FeedbackSpriteContainer');
    this.feedbackImages = feedbackSpritesContainer.children;
    this.feedbackImagesNames = this.feedbackImages.map(img => img.name);
    this.lastFeedbackImageIndex = Math.floor(Math.random() * this.feedbackImages.length);
    this.lastFeedbackSprite = null;
    this.particles = this.entity.findByName('FeedbackParticleSystem').children;


    this.app.on(EventTypes.SHOW_FEEDBACK_EFFECT, this.showFeedbackEffect, this);
};

FeedbackEffect.prototype.showFeedbackEffect = async function (feedbackKey) {
    this.lastFeedbackImageIndex = (this.lastFeedbackImageIndex + 1) % this.feedbackImages.length;

    feedbackKey = feedbackKey || this.feedbackImagesNames[this.lastFeedbackImageIndex] || Utils.getRandomItem(this.feedbackImagesNames);

    const feedbackSprite = this.feedbackImages.find(image => image.name === feedbackKey);
    if (!feedbackSprite) return;
    this.lastFeedbackSprite = feedbackSprite;

    if (LocalizationManager.getInstance().getCurrentLocale().startsWith('en')) {
        feedbackSprite.children[0].enabled = true;
        feedbackSprite.children[1].enabled = false;
    } else {
        feedbackSprite.children[0].enabled = false;
        feedbackSprite.children[1].enabled = true;
    }

    this.feedbackImages.forEach(image => image.enabled = image.name === feedbackKey);

    feedbackSprite.element.opacity = 1;
    feedbackSprite.setLocalScale(0.5, 0.5, 0.5);
    feedbackSprite.setLocalPosition(pc.Vec3.ZERO);


    /* particles */
    this.particles.forEach(particle => {
        particle.setPosition(feedbackSprite.getPosition());
        particle.particlesystem.reset();
        particle.particlesystem.play();
    });

    /* sound */
    this.app.fire(EventTypes.PLAY_SFX, 'feedback' + feedbackKey);

    this.scaleUpTween = feedbackSprite.tween(feedbackSprite.getLocalScale())
        .to({ x: 1.35, y: 1.35, z: 1.35 }, 0.15, pc.SineOut)
        .start();

    await Utils.wait(150);

    this.scaleDownTween = feedbackSprite.tween(feedbackSprite.getLocalScale())
        .to({ x: 1.0, y: 1.0, z: 1.0 }, 0.1, pc.SineOut)
        .start();

    await Utils.wait(100);
    await Utils.wait(150);

    this.movementTween = feedbackSprite.tween(feedbackSprite.getLocalPosition())
        .to({ x: 0, y: 120, z: 0 }, 0.8, pc.SineOut)
        .start();

    this.disappearingTween = feedbackSprite.tween(feedbackSprite.element)
        .to({ opacity: 0.2 }, 0.8, pc.SineIn)
        .onComplete(() => {
            feedbackSprite.enabled = false;
        })
        .start();

};


FeedbackEffect.prototype.update = function (dt) {

};



// PlatformPart.js
var PlatformPart = pc.createScript('platformPart');

PlatformPart.prototype.initialize = function() {
    this.iconsContainer = this.entity.findByName('ClothesIcons');

    this.entity.setClothType = this._setClothType.bind(this);
};

PlatformPart.prototype._setClothType = function(clothingType) {
    this.iconsContainer.children.forEach(child => child.enabled = child.name === clothingType);
};

PlatformPart.prototype.update = function(dt) {

};



// PlatformManager.js
var PlatformManager = pc.createScript('platformManager');

PlatformManager.attributes.add('platformPartTemplate', {
    type: 'asset',
    assetType: 'template'
});

PlatformManager.attributes.add('platformStartZ', {
    type: 'number',
    default: 5.5
});

PlatformManager.attributes.add('platformLength', {
    type: 'number',
    default: 15
});

PlatformManager.getInstance = function () {
    if (!PlatformManager._instance) console.error('PlatformManager is not initialized yet');
    return PlatformManager._instance;
};

PlatformManager.prototype.initialize = function () {
    PlatformManager._app = this.app;
    if (!PlatformManager._instance) {
        PlatformManager._instance = this;
    }

    this.platformsContainer = this.entity.findByName('PlatformParts');
    this.platforms = this.platformsContainer.children.slice();
    this.podium = this.entity.findByName('Podium');
    this.podiumMovable = this.podium.findByName('PodiumMovable');

    this.playerTarget = this.entity.findByName('PlayerTargetPosition');
    this.aiTarget = this.entity.findByName('AITargetPosition');

    this.cameraStartPos = this.entity.findByName('CameraStartPosition');
    this.aiPosingCameraPos = this.entity.findByName('AIPosingCameraPosition');
    this.playerPosingCameraPos = this.entity.findByName('PlayerPosingCameraPosition');
    this.battleCameraPos = this.entity.findByName('BattleCameraPosition');
    this.gemCounterPos = this.entity.findByName('GemCounterPosition');
    this.hammerPosition = this.entity.findByName('HammerPosition');
    this.heartHammerStartPosition = this.entity.findByName('HeartHammerStartPosition');

    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
};


PlatformManager.prototype.reset = function() {
    this.podiumMovable.setLocalPosition(pc.Vec3.ZERO);
};

PlatformManager.prototype.initLevel = function (levelData) {
    this.clearPlatforms();

    const requiredPlatforms = levelData.clothes.length;
    let currentZ = this.platformStartZ;
    for (let i = 0; i < requiredPlatforms; i++) {
        currentZ = this.platformStartZ + i * this.platformLength;
        let platform = this.platformPartTemplate.resource.instantiate();
        this.platformsContainer.addChild(platform);
        this.platforms.push(platform);
        platform.setLocalPosition(0, 0, currentZ);
        platform.setClothType(levelData.clothes[i].clothingType);
    }

    const endPosition = this.podium.getLocalPosition();
    endPosition.z = currentZ + this.platformLength;
    this.podium.setLocalPosition(endPosition);
    this.podiumMovable.setLocalPosition(pc.Vec3.ZERO);
};

PlatformManager.prototype.getRoundCheckpoints = function() {
    const checkpointZValues = [];
    for(let i = 0; i < this.platforms.length; i++) {
        const platformEnterZ = this.platforms[i].getPosition().z + this.platformLength / 2;
        checkpointZValues.push(platformEnterZ);
    }
    return checkpointZValues;
};


PlatformManager.prototype.getPodiumZ = function() {
    return this.podium.getPosition().z;
};

PlatformManager.prototype.getHammerPosition = function() {
    return this.hammerPosition.getPosition();
};

PlatformManager.prototype.getHeartHammerStartPosition = function() {
    return this.heartHammerStartPosition.getPosition();
};

PlatformManager.prototype.movePodiumYForHammerGame = function(targetY, duration, delay, ease) {
    this.podiumMovable.tween(this.podiumMovable.getLocalPosition())
        .to({y: targetY}, duration, ease)
        .delay(delay)
        .start();
};

PlatformManager.prototype.clearPlatforms = function () {
    for (let i = this.platforms.length - 1; i > -1; i--) {
        const platform = this.platforms[i];
        this.platforms.splice(i, 1);
        platform.destroy();
    }
};


PlatformManager.prototype.update = function (dt) {

};



// Podium.js
var Podium = pc.createScript('podium');

Podium.prototype.initialize = function() {
    this.juryPositionsContainer = this.entity.findByName('JuryPositions');
};

Podium.prototype.update = function(dt) {

};



// PlayerController.js
var PlayerController = pc.createScript('playerController');

PlayerController.attributes.add('playerLobbyPosition', {
    type: 'vec3',
    default: [-1.14, 1.03, -7]
});

PlayerController.attributes.add('playerWalkingPosition', {
    type: 'vec3',
    default: [-1.14, 1.03, 0]
});

PlayerController.attributes.add('opponentWalkingPosition', {
    type: 'vec3',
    default: [1.14, 1.03, 0]
});


PlayerController.getInstance = function () {
    if (!PlayerController._instance) console.error('PlayerController is not initialized yet');
    return PlayerController._instance;
};

PlayerController.prototype.initialize = function () {
    PlayerController._app = this.app;
    if (!PlayerController._instance) {
        PlayerController._instance = this;
    }

    this._intitialControllerPosition = this.entity.getPosition().clone();

    this.playersContainer = this.entity.findByName('Players');
    this.playerCharacter = this.playersContainer.findByName('basic-character');
    this.opponentCharacter = this.playersContainer.findByName('basic-character-opponent');

    this.isLobbyWalk = false;
    this.canMove = false;
};

PlayerController.prototype.reset = function () {
    this.canMove = false;
    this.isLobbyWalk = false;

    this.playersContainer.setLocalPosition(pc.Vec3.ZERO);

    this.playerCharacter.reset();
    this.opponentCharacter.reset();

    this.playerCharacter.setLocalPosition(this.playerLobbyPosition);
    this.playerCharacter.setLocalEulerAngles(pc.Vec3.ZERO);
    this.opponentCharacter.setLocalPosition(this.opponentWalkingPosition);
    this.opponentCharacter.setLocalEulerAngles(pc.Vec3.ZERO);

    this.playerCharacter.clearAllClothes();
    this.opponentCharacter.clearAllClothes();
    this.playerCharacter.playIdleAnim();
    this.opponentCharacter.playPosingAnim();

    this.playerCharacter.playIdleAnim();
    this.opponentCharacter.playIdleAnim();

    PetController.getInstance().playIdleAnim();
};

PlayerController.prototype.getPlayerCharacter = function () {
    return this.playerCharacter;
}

PlayerController.prototype.getOpponentCharacter = function () {
    return this.opponentCharacter;
}

PlayerController.prototype.getOffsetZ = function () {
    return this._intitialControllerPosition.z;
}

PlayerController.prototype.getPlayerCharacterPosition = function () {
    return this.playerCharacter.getPosition();
};

PlayerController.prototype.getOpponentCharacterPosition = function () {
    return this.opponentCharacter.getPosition();
};


PlayerController.prototype.getPlayerPosition = function () {
    return this.playersContainer.getPosition();
};


PlayerController.prototype.moveForward = function (deltaZ) {
    this.playersContainer.translateLocal(0, 0, deltaZ);
}


PlayerController.prototype.walkFromLobby = async function (duration = 1.25) {
    return new Promise((resolve, reject) => {
        this.playerCharacter.playWalkingAnim();

        this.playerCharacter.tween(this.playerCharacter.getLocalPosition())
            .to(this.playerWalkingPosition, duration, pc.Linear)
            .onComplete(() => {
                resolve();
            })
            .start();
    });
};


PlayerController.prototype.walkToPodium = async function (duration = 2) {
    return new Promise((resolve, reject) => {

        this.playerCharacter.playWalkingAnim();
        this.opponentCharacter.playWalkingAnim();

        this.playerCharacter.tween(this.playerCharacter.getLocalPosition())
            .to(Utils.worldToLocalPosition(this.playerCharacter, PlatformManager.getInstance().playerTarget.getPosition()), duration, pc.SineOut)
            .onComplete(() => {
                resolve();
            })
            .start();

        this.opponentCharacter.tween(this.opponentCharacter.getLocalPosition())
            .to(Utils.worldToLocalPosition(this.playerCharacter, PlatformManager.getInstance().aiTarget.getPosition()), duration, pc.SineOut)
            .start();

        Utils.wait(duration * 1000 * 0.75).then(() => {
            this.playerCharacter.playFinalIdleAnim();
            this.opponentCharacter.playFinalIdleAnim();
        })
    });
};

PlayerController.prototype.movePlayerToHammerGame = async function (duration = 1.0) {
    return new Promise((resolve, reject) => {
        this.playerCharacter.playIdleAnim();
        this.playerCharacter.tween(this.playerCharacter.getLocalPosition())
            .to({ x: -0.75 }, duration, pc.SineOut)
            .onComplete(() => {
                resolve();
            })
            .start();
    });
};

PlayerController.prototype.movePlayerUpWithPodium = function (targetY, duration, delay, ease) {
    this.playerCharacter.playFinalDanceAnim();
    this.playerCharacter.tween(this.playerCharacter.getLocalPosition())
        .to({ y: targetY }, duration, ease)
        .delay(delay)
        .start();
};


PlayerController.prototype.update = function (dt) {

};



// JuryHand.js
var JuryHand = pc.createScript('juryHand');

JuryHand.prototype.initialize = function () {
    this.pointsBlock = this.entity.findByName('PointsBlock');
    this.pointsText = this.pointsBlock.findByName('PointsCounter');

    this.entity.show = this._show.bind(this);
    this.entity.hide = this._hide.bind(this);

    this._hide(true);
};

JuryHand.prototype._show = async function (points, delay = 0) {
    this._resetTweens();

    this.entity.enabled = false;
    this.pointsBlock.setLocalEulerAngles(0, 0, 180);
    this.entity.setLocalScale(0.5, 0.5, 0.5);

    await Utils.wait(delay * 1000);
    this.entity.enabled = true;
    this.pointsText.element.text = `${points}`;
    this.entity.anim.reset();
    this.entity.anim.setTrigger('show');

    this.pointsBlock.tween(this.pointsBlock.getLocalEulerAngles())
        .rotate(pc.Vec3.ZERO, 0.7, pc.SineOut)
        .start();
        
    this.entity.tween(this.entity.getLocalScale())
        .to(pc.Vec3.ONE, 0.25, pc.SineOut)
        .start();

};

JuryHand.prototype._hide = async function (immediately = false, delay = 0) {
    if (immediately) {
        this.entity.enabled = false;
        this._resetTweens();
    } else {
        await Utils.wait(delay * 1000);
        this.entity.anim.setTrigger('hide');
        this.pointsBlock.tween(this.pointsBlock.getLocalEulerAngles())
            .rotate({x: 0, y: 0, z: 180}, 0.4, pc.SineOut)
            .start();

        this.entity.tween(this.entity.getLocalScale())
            .to({x: 0.5, y: 0.5, z: 0.5}, 0.4, pc.SineOut)
            .start();

        await Utils.wait(400);
        this.entity.enabled = false;
    }
};

JuryHand.prototype._resetTweens = function () {
    this.app.stopAllTweens(this.entity);
    this.app.stopAllTweens(this.pointsBlock);
    this.entity.anim.reset();
};




JuryHand.prototype.update = function (dt) {

};



// JuryController.js
var JuryController = pc.createScript('juryController');


JuryController.attributes.add('emojiIcons', {
    type: 'json',
    schema: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'icon',
        type: 'asset',
        assetType: 'texture'
    }],
    array: true
})

JuryController.getInstance = function () {
    if (!JuryController._instance) console.error('JuryController is not initialized yet');
    return JuryController._instance;
};

JuryController.prototype.initialize = function () {
    JuryController._app = this.app;
    if (!JuryController._instance) {
        JuryController._instance = this;
    }

    this.lastMyplayerPoints = [];
    this.lastAIPoints = [];

    this.handsContainer = this.entity.findByName('HandsContainer');
    this.hands = this.handsContainer.children.slice();
};


JuryController.prototype.showJuryPoints = async function (pointsArray, duration = 1.8, visibilityDuration = 1.5) {
    const promises = [];
    this.hands.forEach((hand, index) => {
        promises.push(hand.show(pointsArray[index], index * duration / 3));
    });

    await Promise.all(promises);

    await Utils.wait(visibilityDuration * 1000);

    await this.hideJuryPoints();
};


JuryController.prototype.hideJuryPoints = async function () {
    const promises = [];
    this.hands.forEach((hand, index) => {
        promises.push(hand.hide(false, index * 0.2));
    });
    await Promise.all(promises);
};


JuryController.prototype.splitScoreIntoThreePoints = function (score) {
    score = Math.floor(pc.math.clamp(score, 3, 30));
    const buckets = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        buckets[i] += 1;
        score -= 1;
    }

    while (score > 0) {
        const availableBucketIndices = buckets.map((x, index) => x < 10 ? index : -1).filter(x => x !== -1);
        const randomBucketIndex = Utils.getRandomItem(availableBucketIndices);
        buckets[randomBucketIndex] += 1;
        score -= 1;
    }

    return buckets;
};

JuryController.prototype.reset = function () {
    this.hands.forEach(hand => hand.hide(true));
    this._initEmojies();
};

JuryController.prototype.update = function (dt) {

};

JuryController.prototype.postUpdate = function (dt) {
    this.handsContainer.setPosition(MainCameraManager.getInstance().getJuryContainerPosition());
    this.handsContainer.setRotation(MainCameraManager.getInstance().getJuryContainerRotation());
};

/** emojies */
JuryController.prototype._initEmojies = function () {
    if (this.__emojiiesInitialized) return;
    this.__emojiiesInitialized = true;

    const playerEmojies = PlayerController.getInstance().getPlayerCharacter().getEmojiesContainer();
    const botEmojies = PlayerController.getInstance().getOpponentCharacter().getEmojiesContainer();

    this.playerHatEmoji = playerEmojies.findByName('HatEmoji');
    this.playerGlassesEmoji = playerEmojies.findByName('GlassEmoji');
    this.playerNecklaceEmoji = playerEmojies.findByName('NecklaceEmoji');
    this.playerGlovesEmoji = playerEmojies.findByName('GloveEmoji');
    this.playerHairEmoji = playerEmojies.findByName('HairEmoji');
    this.playerTopHalfEmoji = playerEmojies.findByName('TopEmoji');
    this.playerDressEmoji = playerEmojies.findByName('DressEmoji');
    this.playerBottomHalfEmoji = playerEmojies.findByName('BottomEmoji');
    this.playerShoesEmoji = playerEmojies.findByName('ShoeEmoji');
    this.botHatEmoji = botEmojies.findByName('HatEmoji')
    this.botGlassesEmoji = botEmojies.findByName('GlassEmoji')
    this.botNecklaceEmoji = botEmojies.findByName('NecklaceEmoji')
    this.botGlovesEmoji = botEmojies.findByName('GloveEmoji')
    this.botHairEmoji = botEmojies.findByName('HairEmoji')
    this.botTopHalfEmoji = botEmojies.findByName('TopEmoji')
    this.botDressEmoji = botEmojies.findByName('DressEmoji')
    this.botBottomHalfEmoji = botEmojies.findByName('BottomEmoji')
    this.botShoesEmoji = botEmojies.findByName('ShoeEmoji')
};

JuryController.prototype.hideEmoji = function (emoji) {
    emoji.hide();
};

JuryController.prototype.hideAllEmojies = function () {
    this.hideEmoji(this.playerHatEmoji);
    this.hideEmoji(this.playerGlassesEmoji);
    this.hideEmoji(this.playerNecklaceEmoji);
    this.hideEmoji(this.playerGlovesEmoji);
    this.hideEmoji(this.playerHairEmoji);
    this.hideEmoji(this.playerTopHalfEmoji);
    this.hideEmoji(this.playerDressEmoji);
    this.hideEmoji(this.playerBottomHalfEmoji);
    this.hideEmoji(this.playerShoesEmoji);
    this.hideEmoji(this.botHatEmoji);
    this.hideEmoji(this.botGlassesEmoji);
    this.hideEmoji(this.botNecklaceEmoji);
    this.hideEmoji(this.botGlovesEmoji);
    this.hideEmoji(this.botHairEmoji);
    this.hideEmoji(this.botTopHalfEmoji);
    this.hideEmoji(this.botDressEmoji);
    this.hideEmoji(this.botBottomHalfEmoji);
    this.hideEmoji(this.botShoesEmoji);
};

JuryController.prototype.getLastPlayerScore = function () {
    return Math.floor(this.lastMyplayerPoints.reduce((a, b) => a + b));
};

JuryController.prototype.getLastOpponentScore = function () {
    return Math.floor(this.lastAIPoints.reduce((a, b) => a + b));
};

JuryController.prototype.showEmojis = async function (character) {
    const isPlayer = character.isPlayer();
    const correctnessRecords = character.getEquippedClothesCorrectness();
    const judgedClothingTypes = [Constants.ClothingType.Top, Constants.ClothingType.Dress, Constants.ClothingType.Bottom, Constants.ClothingType.Hair, Constants.ClothingType.Accessories, Constants.ClothingType.Shoes];
    const emojiesList = [];
    judgedClothingTypes.forEach(judgedType => {
        if (correctnessRecords.has(judgedType)) {
            const correctnessValue = correctnessRecords.get(judgedType);
            const emojiTexture = correctnessValue === Constants.ChoiceCorrectness.Celebrity ? this.emojiIcons.find(x => x.name === 'celebrity') : correctnessValue === Constants.ChoiceCorrectness.Good ? this.emojiIcons.find(x => x.name === 'perfect') : this.emojiIcons.find(x => x.name === 'null');
            let emoji = null;
            switch (judgedType) {
                case Constants.ClothingType.Top:
                    emoji = isPlayer ? this.playerTopHalfEmoji : this.botTopHalfEmoji;
                    break;
                case Constants.ClothingType.Dress:
                    emoji = isPlayer ? this.playerDressEmoji : this.botDressEmoji;
                    break;
                case Constants.ClothingType.Bottom:
                    emoji = isPlayer ? this.playerBottomHalfEmoji : this.botBottomHalfEmoji;
                    break;
                case Constants.ClothingType.Hair:
                    emoji = isPlayer ? this.playerHatEmoji : this.botHatEmoji;
                    break;
                case Constants.ClothingType.Accessories:
                    emoji = isPlayer ? this.playerGlovesEmoji : this.botGlovesEmoji;
                    break;
                case Constants.ClothingType.Shoes:
                    emoji = isPlayer ? this.playerShoesEmoji : this.botShoesEmoji;
                    break;
            }

            if (emoji) {
                emoji.setTextureAsset(emojiTexture.icon);
                emojiesList.push(emoji);
            }
        }
    });

    emojiesList.forEach((emoji, index) => {
        emoji.show(index * 0.2);
    });
};

JuryController.prototype.judgeCharacters = function () {
    const playerCharacter = PlayerController.getInstance().getPlayerCharacter();
    const playerCorrectnessRecords = playerCharacter.getEquippedClothesCorrectness();
    const opponentCharacter = PlayerController.getInstance().getOpponentCharacter();
    const opponentCorrectnessRecords = opponentCharacter.getEquippedClothesCorrectness();

    this.lastAIPoints = [];
    this.lastMyplayerPoints = [];
    let myPlayerShouldWin = DataManager.getInstance().playerShouldWin();




    const judgedClothingTypes = [Constants.ClothingType.Top, Constants.ClothingType.Dress, Constants.ClothingType.Bottom, Constants.ClothingType.Hair, Constants.ClothingType.Accessories, Constants.ClothingType.Shoes];
    let playerPoints = 0;
    let opponentPoints = 0;

    judgedClothingTypes.forEach(judgedType => {
        if (playerCorrectnessRecords.has(judgedType)) {
            const correctnessValue = playerCorrectnessRecords.get(judgedType);

            let clothingScore = 0;
            if (correctnessValue === Constants.ChoiceCorrectness.Celebrity) {
                clothingScore = 10;
            } else if (correctnessValue === Constants.ChoiceCorrectness.Good) {
                clothingScore = myPlayerShouldWin ? pc.math.random(9, 10) : pc.math.random(8, 10);
            } else if (correctnessValue === Constants.ChoiceCorrectness.Bad) {
                clothingScore = myPlayerShouldWin ? pc.math.random(3, 7) : pc.math.random(2, 7);
            } else if (correctnessValue === Constants.ChoiceCorrectness.Empty) {
                clothingScore = pc.math.random(1, 4);
            }
            playerPoints += clothingScore;
        }

        if (opponentCorrectnessRecords.has(judgedType)) {
            const correctnessValue = opponentCorrectnessRecords.get(judgedType);

            let clothingScore = 0;
            if (correctnessValue === Constants.ChoiceCorrectness.Celebrity) {
                clothingScore = 10;
            } else if (correctnessValue === Constants.ChoiceCorrectness.Good) {
                clothingScore = pc.math.random(8, 10);
            } else if (correctnessValue === Constants.ChoiceCorrectness.Bad) {
                clothingScore = pc.math.random(2, 7);
            } else if (correctnessValue === Constants.ChoiceCorrectness.Empty) {
                clothingScore = pc.math.random(1, 4);
            }
            opponentPoints += clothingScore;
        }
    });

    const RandomRange = (a, b) => Math.floor(pc.math.random(a, b + 1));
    let myTotal;
    let aiTotal;

    const maxPossiblePlayerPoints = playerCorrectnessRecords.size * 10;
    myTotal = pc.math.clamp(Math.round(playerPoints / maxPossiblePlayerPoints * 30), 0, 30);

    const opponentScoreMultiplier = DataManager.getInstance().getOpponentScoreMultiplier();
    const maxPossibleOpponentPoints = opponentCorrectnessRecords.size * 10;
    aiTotal = pc.math.clamp(Math.round(opponentPoints * opponentScoreMultiplier / maxPossibleOpponentPoints * 30), 0, 30);


    // Debug.error('opponent points: '+ aiTotal + ' factor ' + opponentScoreMultiplier)    
    // Debug.error('player points: ', myTotal)    




    // let myMin = -1;
    // let myMax = -1;

    // let aiMin = 0;
    // let aiMax = 0;

    // let dif = 0;

    // let nonSelectedOutfitCount = [...playerCorrectnessRecords.values()].filter(x => x === Constants.ChoiceCorrectness.Empty).length;
    // // Debug.log('non selected: ' + nonSelectedOutfitCount);

    // let myWrongChoiceCount = [...playerCorrectnessRecords.values()].filter(x => x === Constants.ChoiceCorrectness.Bad).length;
    // // Debug.warn('wrong: ' + myWrongChoiceCount);

    // let celebrityChoiceCount = [...playerCorrectnessRecords.values()].filter(x => x === Constants.ChoiceCorrectness.Celebrity).length;
    // // Debug.warn('celebrity: ' + celebrityChoiceCount);

    // let isCelebrityLevel = CelebrityManager.getInstance().isCelebrityActive();

    // if (isCelebrityLevel && nonSelectedOutfitCount == 0 && celebrityChoiceCount > 0) {
    //     if (celebrityChoiceCount == 4) {
    //         myMin = 30;
    //         myMax = 30;
    //         aiMin = 26;
    //         aiMax = 29;
    //     } else {
    //         myMin = 28;
    //         myMax = 29;
    //         aiMin = 26;
    //         aiMax = 27;
    //     }
    // } else if (nonSelectedOutfitCount == 1) {
    //     myMin = 14;
    //     myMax = 18;

    //     if (myPlayerShouldWin) {
    //         aiMin = 19;
    //         aiMax = 21;
    //     } else {
    //         aiMin = 26;
    //         aiMax = 30;
    //     }
    // } else if (nonSelectedOutfitCount == 2) {
    //     myMin = 10;
    //     myMax = 13;

    //     if (myPlayerShouldWin) {
    //         aiMin = 19;
    //         aiMax = 21;
    //     } else {
    //         aiMin = 26;
    //         aiMax = 30;
    //     }
    // } else if (nonSelectedOutfitCount == 3) {
    //     myMin = 5;
    //     myMax = 9;

    //     if (myPlayerShouldWin) {
    //         aiMin = 19;
    //         aiMax = 21;
    //     }
    //     else {
    //         aiMin = 26;
    //         aiMax = 30;
    //     }
    // } else if (nonSelectedOutfitCount == 4) {
    //     myMin = 3;
    //     myMax = 3;

    //     if (myPlayerShouldWin) {
    //         aiMin = 19;
    //         aiMax = 21;
    //     }
    //     else {
    //         aiMin = 26;
    //         aiMax = 30;
    //     }
    // } else if (myPlayerShouldWin) {
    //     switch (myWrongChoiceCount) {
    //         case 0:
    //             myMin = isCelebrityLevel ? 27 : 26;
    //             myMax = isCelebrityLevel ? 28 : 30;
    //             dif = isCelebrityLevel ? -2 : -8;
    //             break;
    //         case 1:
    //             myMin = 22;
    //             myMax = 25;
    //             dif = -5;
    //             break;
    //         case 2:
    //             myMin = 19;
    //             myMax = 21;
    //             dif = -2;
    //             break;
    //     }
    // } else {
    //     switch (myWrongChoiceCount) {
    //         case 0:
    //             myMin = 25;
    //             myMax = 27;
    //             dif = 2;
    //             break;
    //         case 1:
    //             myMin = 22;
    //             myMax = 25;
    //             dif = 5;
    //             break;
    //         case 2:
    //             myMin = 19;
    //             myMax = 21;
    //             dif = 8;
    //             break;
    //     }
    // }

    // let myTotal;
    // let aiTotal;


    // if (dif == 0) {
    //     myTotal = RandomRange(myMin, myMax + 1);
    //     aiTotal = RandomRange(aiMin, aiMax + 1);
    // }
    // else {
    //     myTotal = RandomRange(myMin, myMax + 1);
    //     aiTotal = myTotal + dif;
    // }


    if (myTotal == 29) {
        this.lastMyplayerPoints.push(9);
        this.lastMyplayerPoints.push(10);
        this.lastMyplayerPoints.push(10);
    } else {
        this.lastMyplayerPoints.push(myTotal / 3);
        this.lastMyplayerPoints.push((myTotal / 3));
        this.lastMyplayerPoints.push(myTotal - ((myTotal / 3) * 2));
    }

    if (aiTotal == 29) {
        this.lastAIPoints.push(9);
        this.lastAIPoints.push(10);
        this.lastAIPoints.push(10);
    } else {
        this.lastAIPoints.push(aiTotal / 3);
        this.lastAIPoints.push(aiTotal / 3);
        this.lastAIPoints.push(aiTotal - ((aiTotal / 3) * 2));
    }

    // Debug.error('before player sum ' + myTotal, this.lastMyplayerPoints);
    // Debug.error('before ai ' + aiTotal, this.lastAIPoints);


    // for (let i = 0; i < 3; i++) // 3:jury count
    // {
    //     for (let j = 0; j < 3; j++) // 3:jury count
    //     {
    //         if (i == j) {
    //             continue;
    //         }

    //         if (this.lastMyplayerPoints[j] == 10) {
    //             continue;
    //         }

    //         let x = RandomRange(1, Math.min(this.lastMyplayerPoints[i] - 1, 10 - this.lastMyplayerPoints[j]));
    //         this.lastMyplayerPoints[i] -= x;
    //         this.lastMyplayerPoints[j] += x;
    //         if (this.lastMyplayerPoints[j] > 10 || this.lastMyplayerPoints[j] < 0 || this.lastMyplayerPoints[i] < 0) {
    //             Debug.log("Player jury score is out of range");
    //             this.lastMyplayerPoints[i] = pc.math.clamp(this.lastMyplayerPoints[i], 0, 10);
    //             this.lastMyplayerPoints[j] = pc.math.clamp(this.lastMyplayerPoints[j], 0, 10);
    //         }
    //     }
    // }

    // for (let i = 0; i < 3; i++) {
    //     for (let j = 0; j < 3; j++) {
    //         if (i == j) {
    //             continue;
    //         }

    //         if (this.lastAIPoints[j] == 10) {
    //             continue;
    //         }

    //         let x = RandomRange(1, Math.min(this.lastAIPoints[i] - 1, 10 - this.lastAIPoints[j]));
    //         this.lastAIPoints[i] -= x;
    //         this.lastAIPoints[j] += x;
    //         if (this.lastAIPoints[j] > 10 || this.lastAIPoints[j] < 0 || this.lastAIPoints[i] < 0) {
    //             Debug.log("Opponent jury score is out of range");
    //             this.lastAIPoints[i] = pc.math.clamp(this.lastAIPoints[i], 0, 10);
    //             this.lastAIPoints[j] = pc.math.clamp(this.lastAIPoints[j], 0, 10);
    //         }
    //     }
    // }

    // Debug.error('pre-rounding player ', this.lastMyplayerPoints);
    // Debug.error('pre-rounding ai ', this.lastAIPoints);

    // for(let i = 0; i < this.lastMyplayerPoints.length; i++) {
    //     this.lastMyplayerPoints[i] = Math.floor(this.lastMyplayerPoints[i]);
    // }
    // for(let i = 0; i < this.lastAIPoints.length; i++) {
    //     this.lastAIPoints[i] = Math.floor(this.lastAIPoints[i]);
    // }


    this.lastMyplayerPoints = Utils.shuffle(this.lastMyplayerPoints);
    this.lastAIPoints = Utils.shuffle(this.lastAIPoints);

    // Debug.error('Final player points: ', this.lastMyplayerPoints);
    // Debug.error('Final opponent points: ', this.lastAIPoints);
};



// Emoji.js
var Emoji = pc.createScript('emoji');

Emoji.prototype.initialize = function () {
    this.line = this.entity.findByName('LineSprite');
    this.icon = this.entity.findByName('IconEmoji');

    this.entity.setTextureAsset = this._setTextureAsset.bind(this);
    this.entity.show = this._show.bind(this);
    this.entity.hide = this._hide.bind(this);

    this._hide(true);
};

Emoji.prototype._setTextureAsset = function (textureAsset) {
    if (textureAsset) {
        this.icon.element.textureAsset = textureAsset.id;
    }
}

Emoji.prototype._show = async function (delay = 0, textureAsset = null) {
    this._setTextureAsset(textureAsset);

    await Utils.wait(delay * 1000);

    const duration = 0.5;
    this.entity.setLocalScale(pc.Vec3.ZERO);
    this.entity.tween(this.entity.getLocalScale())
        .to(pc.Vec3.ONE, duration, pc.BackOut)
        .start();

    [this.line, this.icon].forEach(spr => {
        spr.element.opacity = 0;
        spr.tween(spr.element)
            .to({ opacity: 1 }, 0.2, pc.Linear)
            .start();
    });
};


Emoji.prototype._hide = function (immediately = false) {
    if (immediately) {
        this.line.element.opacity = 0;
        this.icon.element.opacity = 0;
    } else {
        [this.line, this.icon].forEach(spr => {
            spr.tween(spr.element)
                .to({ opacity: 0 }, 0.2, pc.Linear)
                .start();
        });
    }
};


Emoji.prototype.update = function (dt) {

};



// gemCounter.js
var GemCounter = pc.createScript('gemCounter');


GemCounter.attributes.add('tweenValues', {
    type: 'boolean',
    default: true
});

GemCounter.attributes.add('tweenDuration', {
    type: 'number',
    default: 0.5
});


GemCounter.getInstance = function () {
    if (!GemCounter._instance) console.error('GemCounter is not initialized yet');
    return GemCounter._instance;
};

GemCounter.prototype.initialize = function () {
    GemCounter._app = this.app;
    if (!GemCounter._instance) {
        GemCounter._instance = this;
    }
    this.gemsContainer = this.entity.findByName('GemContainer');
    this.iconGems = this.gemsContainer.findByName('GemIcon');
    this.textGems = this.gemsContainer.findByName('GemAmountText');
    this.collectablesSpawnerGems = this.entity.findByName('CollectablesSpawner_Gems');

    this.app.on(EventTypes.GEMS_AMOUNT_CHANGED, this._updateGems, this);
    this._gemsValue = 0;
};

GemCounter.prototype.postInitialize = function() {
    this._updateGems(DataManager.getInstance().gems);
    this.show();
};

GemCounter.prototype.show = function () {
    return new Promise((resolve, reject) => {
        this.entity.enabled = true;
        this.collectablesSpawnerGems.clear();
        this.gemsContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
        this.gemsContainer.once(EventTypes.UI_ELEMENT.APPEARED, () => resolve())
    });
};

GemCounter.prototype.hide = function () {
    return new Promise((resolve, reject) => {
        this.collectablesSpawnerGems.clear();
        this.gemsContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
        this.gemsContainer.once(EventTypes.UI_ELEMENT.DISAPPEARED, () => resolve())
    });
};

GemCounter.prototype.spawnAndPickupGems = async function (_fromWorldPosition, amount, duration = 1.25) {
    if (!amount) return Promise.resolve();
    if (this.tweenValues) {
        const delay = Math.max(duration - this.tweenDuration / 2);
        Utils.wait(delay * 1000).then(() => {
            DataManager.getInstance().gems += amount;
            LocalStorageController.save();
        });
    } else {
        DataManager.getInstance().gems += amount;
        LocalStorageController.save();
    }
    return this.collectablesSpawnerGems.collect(_fromWorldPosition, this.iconGems.getPosition(), amount, duration);
};

GemCounter.prototype._updateGems = function (value) {
    if (value !== this._gemsValue || !this._gemsValue) {
        const prevValue = this._gemsValue;
        this._gemsValue = value;
        if (this.tweenValues) {
            Utils.tweenText(this.textGems, prevValue, this._gemsValue, this.tweenDuration, 0, pc.Linear, true);
        } else {
            this.textGems.element.text = `${value}`;//`${Utils.formanMoney(value)}`;
        }
    }
};


GemCounter.prototype.update = function (dt) {

};



// CollectablesSpawner.js
var CollectablesSpawner = pc.createScript('collectablesSpawner');

CollectablesSpawner.attributes.add('limitAmount', {
    type: 'vec2',
    default: [0, 25]
});


CollectablesSpawner.attributes.add('visualAmountModifier', {
    type: 'number',
    default: 0.5,
    min: 0.01,
    max: 1
});


CollectablesSpawner.attributes.add('spawnRadius', {
    type: 'number',
    default: 100
});

CollectablesSpawner.attributes.add('startAngle', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('randomizeStartAngle', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('endAngle', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('randomizeEndAngle', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('startScale', {
    type: 'number',
    default: 1.5
});

CollectablesSpawner.attributes.add('randomizeStartScale', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('endScale', {
    type: 'number',
    default: 0.5
});

CollectablesSpawner.attributes.add('randomizeEndScale', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('durationAppearDelayWeight', {
    type: 'number',
    default: 0.1
});

CollectablesSpawner.attributes.add('durationSpawnWeight', {
    type: 'number',
    default: 0.5
});

CollectablesSpawner.attributes.add('durationDelayWeight', {
    type: 'number',
    default: 0.1
});

CollectablesSpawner.attributes.add('durationMovementWeight', {
    type: 'number',
    default: 0.75
});

CollectablesSpawner.attributes.add('durationRandomWeight', {
    type: 'number',
    default: 0.1
});

CollectablesSpawner.prototype.initialize = function () {
    this.sampleIcon = this.entity.findByName('SampleIcon');
    this._iconInitialScale = this.sampleIcon.getLocalScale().clone();
    this._iconInitialAngles = this.sampleIcon.getLocalEulerAngles().clone();
    this._iconInitialPosition = this.sampleIcon.getLocalPosition().clone();
    this.sampleIcon.enabled = false;

    this.iconsCache = [this.sampleIcon];

    this.entity.collect = this._collect.bind(this);
    this.entity.clear = this._clear.bind(this);
};

CollectablesSpawner.prototype._clear = function() {
    this.entity.children.forEach(child => {
        if(child !== this.sampleIcon) this._disposeIcon(child);
    });
};

CollectablesSpawner.prototype._collect = function (_fromPosition, _toPosition, _amount, _duration) {
    return new Promise((resolve, reject) => {
        const amount = pc.math.clamp(_amount * this.visualAmountModifier, this.limitAmount.x, this.limitAmount.y);
        if (amount === 0) {
            resolve();
            return;
        }

        const durationWeigthSum = this.durationAppearDelayWeight + this.durationSpawnWeight + this.durationDelayWeight + this.durationMovementWeight + this.durationRandomWeight;

        let durationStart = _duration * this.durationAppearDelayWeight / durationWeigthSum;
        let durationSpawn = _duration * this.durationSpawnWeight / durationWeigthSum;
        let durationDelay = _duration * this.durationDelayWeight / durationWeigthSum;
        let durationMovement = _duration * this.durationMovementWeight / durationWeigthSum;
        let durationRandom = _duration * this.durationRandomWeight / durationWeigthSum;
        durationRandom *= 0.5;

        const promises = [];

        for (let i = 0; i < amount; i++) {
            const icon = this._instantiateIcon();
            icon.element.opacity = 0;
            icon.enabled = true;

            icon.setPosition(_fromPosition);
            const _spawnLocalPosition = icon.getLocalPosition();

            const _initialAngle = this.startAngle + pc.math.random(-this.randomizeStartAngle * 0.5, this.randomizeStartAngle * 0.5);
            icon.rotateLocal(0, 0, _initialAngle);

            const _initialScaleValue = this.startScale + pc.math.random(-this.randomizeStartScale * 0.5, this.randomizeStartScale * 0.5);
            icon.setLocalScale(_initialScaleValue * 0.5, _initialScaleValue * 0.5, _initialScaleValue * 0.5);

            /* calculate spawn position */
            const _randomAngle = pc.math.random(-Math.PI, Math.PI);
            const _randomRadius = pc.math.random(0, this.spawnRadius);
            const _randomSpawnPosition = new pc.Vec3(_spawnLocalPosition.x + Math.sin(_randomAngle) * _randomRadius, _spawnLocalPosition.y + Math.cos(_randomAngle) * _randomRadius, _spawnLocalPosition.z);

            /* calculate durations */
            const _spawnDelay = Math.max(0, durationStart + pc.math.random(0, 2 * durationRandom));
            const _durationSpawn = Math.max(0.001, durationSpawn + pc.math.random(-durationRandom, durationRandom));
            const _durationMovement = Math.max(0.001, durationMovement + pc.math.random(-durationRandom, durationRandom));
            const _flyingDelay = Math.max(0, durationDelay + pc.math.random(-durationRandom, durationRandom));
            const _flyingEndScale = this.endScale + pc.math.random(-this.randomizeEndScale * 0.5, this.randomizeEndScale * 0.5);
            const _flyingEndAngle = this.endAngle + pc.math.random(-this.randomizeEndAngle * 0.5, this.randomizeEndAngle * 0.5);

            /* calculate final position */
            const _targetLocalPosition = Utils.worldToLocalPosition(icon, _toPosition);

            /* opacity with initial delay */
            const promise = this._animateIconSpawning(icon, _spawnDelay, _durationSpawn, _initialScaleValue, _randomSpawnPosition)
                .then(async () => {
                    /* fly to final position */
                    await this._animateIconFlying(icon, _flyingDelay, _durationMovement, _flyingEndScale, _targetLocalPosition, _flyingEndAngle);

                    this._disposeIcon(icon);
                });
            promises.push(promise);
        }

        Promise.all(promises).then(() => resolve());
    });
};


CollectablesSpawner.prototype._instantiateIcon = function() {
    if(this.iconsCache.length > 0) {
        return this.iconsCache.pop();
    } else {
        const clonedIcon = this.sampleIcon.clone();
        clonedIcon.reparent(this.sampleIcon.parent);
        clonedIcon.setLocalScale(this._iconInitialScale);
        clonedIcon.setLocalPosition(this._iconInitialPosition);
        clonedIcon.setLocalEulerAngles(this._iconInitialAngles);
        return clonedIcon;
    }
};


CollectablesSpawner.prototype._disposeIcon = function(icon) {
    if(this.iconsCache.indexOf(icon) === -1) {
        this.iconsCache.push(icon);
        icon.element.opacity = 0;
        this.app.stopAllTweens(icon);
        icon.enabled = false;
        icon.setLocalScale(this._iconInitialScale);
        icon.setLocalPosition(this._iconInitialPosition);
        icon.setLocalEulerAngles(this._iconInitialAngles);
    }
};

CollectablesSpawner.prototype._animateIconSpawning = function (icon, _spawnDelay, duration, _scale, _position) {
    return new Promise((resolve, reject) => {
        /* opacity */
        icon.tween(icon.element)
            .to({ opacity: 1 }, duration * 0.5, pc.Linear)
            .delay(_spawnDelay)
            .start();

        icon.tween(icon.getLocalScale())
            .to({ x: _scale, y: _scale, z: _scale }, duration, pc.BackOut)
            .delay(_spawnDelay)
            .start();

        icon.tween(icon.getLocalPosition())
            .to(_position, duration, pc.QuarticOut)
            .delay(_spawnDelay)
            .onComplete(() => resolve())
            .start();
    })
};


CollectablesSpawner.prototype._animateIconFlying = function (icon, _flyingDelay, duration, _scale, _position, _angle) {
    return new Promise((resolve, reject) => {
        /* opacity */
        icon.tween(icon.element)
            .to({ opacity: 1 }, duration * 0.5, pc.Linear)
            .delay(_flyingDelay)
            .start();

        icon.tween(icon.getLocalScale())
            .to({ x: _scale, y: _scale, z: _scale }, duration, pc.CubicIn)
            .delay(_flyingDelay)
            .start();

        icon.tween(icon.getLocalEulerAngles())
            .to({ x: 0, y: 0, z: _angle }, duration, pc.CubicIn)
            .delay(_flyingDelay)
            .start();

        icon.tween(icon.getLocalPosition())
            .to(_position, duration, pc.QuadraticIn)
            .delay(_flyingDelay)
            .onComplete(() => resolve())
            .start();
    })
};


CollectablesSpawner.prototype.update = function (dt) {

};


// Screen_Defeat.js
class ScreenDefeat extends BaseWindow {

    initialize() {
        super.initialize();

        this.buttonTryAgain = this.entity.findByName('ButtonTryAgain');

        this.buttonTryAgain.on(EventTypes.BUTTON_PRESSED, this.onTryAgainPressed, this);
    }


    _initComponents() {
        super._initComponents();
    }

    _onShow() {
        super._onShow();

        DataManager.getInstance().resetRewardedAdLimit();

        this.app.fire(EventTypes.PLAY_SFX, 'defeat');

        this.buttonTryAgain.enabled = false;
        Utils.wait(1250).then(() => {
            this.buttonTryAgain.setAvailable(true);
            this.buttonTryAgain.enabled = true;
            this.buttonTryAgain.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
        })
    }

    _onAppeared() {
    }

    _onHide() {
        super._onHide();
    }

    update(dt) {

    }

    onTryAgainPressed() {
        this.buttonTryAgain.enabled = false;
        this.buttonTryAgain.setAvailable(false);
        APIMediator.showInterstitialAd('button:defeat:tryagain').then(() => {
            LevelController.getInstance().exitToMainMenu();
        });
    }

}

pc.registerScript(ScreenDefeat, 'screenDefeat');

// famobiSafeArea.js
/**
 * A script that automatically adds required gaps & resizes game canvas to fit Famobi interstitial banner.
 * 
 * How to use: just attach that script to the Root component of your Playcanvas app.
 * To test how it works, please use 'Debug / Testing Mode' attribute of the script. Don't forget to disable debug mode before publising a build! :)
 * 
 *  If you are using Window Resize API (window.onresize(...) or window.addEventListener('resize', ....)),
 *  please get rid of these. Instead , please listen to 'famobi:resizeCanvas' in-app event. For example: 
 * 
 *      this.app.on('famobi:resizeCanvas', function(canvasWidth, canvasHeight) {
 *          console.log('Adjusted canvas size is ', canvasWidth, canvasHeight);
 *      })
 * 
 * 
 * @author Igor Parada / ©Famobi 2023
 */

var FamobiSafeArea = pc.createScript('famobiSafeArea');

FamobiSafeArea.attributes.add('resizeOnInput', {
    type: 'boolean',
    title: 'Resize when input received',
    description: "Resize the canvas every time an input event is received? This may help if the game reports incorrect input positions due to Famobi offsets but may cause slight CPU overhead in some games.",
    default: true
});

FamobiSafeArea.attributes.add('forceBodyBackgroundColor', {
    type: 'boolean',
    default: true,
    title: 'Change <body> background',
    default: true
});

FamobiSafeArea.attributes.add('bodyBackgroundColor', {
    type: 'rgba',
    title: 'Body Background Color',
    description: "Background color of body element (where the banner should be displayed). Make sure the checkbox above is checked!",
    default: [0, 0, 0, 1.0]
})

FamobiSafeArea.attributes.add('debugConfig', {
    type: 'json',
    title: 'Debug / Testing Mode',
    description: 'Force safe areas to be applied to the UI. Useful testing layouts without a device.',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'top',
        type: 'number',
        default: 0
    }, {
        name: 'bottom',
        type: 'number',
        default: 0
    }, {
        name: 'left',
        type: 'number',
        default: 0
    }, {
        name: 'right',
        type: 'number',
        default: 0
    }]
});



FamobiSafeArea.prototype.initialize = function () {
    this.app.graphicsDevice.on('resizecanvas', this._onCanvasResize, this);

    this.on('attr:debugConfig', function (value, prev) {
        this._updateCanvasSizeAndPosition();
    }, this);

    this.on('attr:bodyBackgroundColor', function (value, prev) {
        this._backgroundColorUpdate();
    }, this);

    this.on('destroy', function () {
        this.app.graphicsDevice.off('resizecanvas', this._onCanvasResize, this);
    }, this);


    if (window.GameInterface && typeof window.GameInterface.onOffsetChange === 'function') {
        window.GameInterface.onOffsetChange(offsets => this._onCanvasResize());
    } else if (window.famobi && typeof window.famobi.onOffsetChange === 'function') {
        window.famobi.onOffsetChange(offsets => this._onCanvasResize());
    }


    /** viewport resize handling **/
    if (window.visualViewport) {
        this.useVisualViewport = true;
        window.visualViewport.addEventListener('resize', this._onCanvasResize.bind(this));
    } else {
        this.useVisualViewport = false;
        window.addEventListener('resize', this._onCanvasResize.bind(this), true);
    }

    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this._dispatchInputEvent, this);
    } 
    if (this.app.mouse) {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this._dispatchInputEvent, this);
    } 

    this._onCanvasResize();

    this.app.getFamobiAdjustedCanvasSize = () => {
        return {
            width: this._currentCanvasWidth,
            height: this._currentCanvasHeight
        }
    }

};

FamobiSafeArea.prototype._dispatchInputEvent = function() {
    if(this.resizeOnInput) {
        this._updateCanvasSizeAndPosition();
    } else {
        if(!this._firstInputEventReceived) {
            this._firstInputEventReceived = true;
            this._onCanvasResize();
        }
    }
}

FamobiSafeArea.prototype._onCanvasResize = function () {
    this._updateCanvasSizeAndPosition();

    /* known issue on iOS - window.resize may report incorrect window size, so we slightly delay the resize logic */
    if (pc.platform.ios || pc.platform.mobile) {
        setTimeout(() => this._updateCanvasSizeAndPosition(), 1500);
    }
};


FamobiSafeArea.prototype._updateCanvasSizeAndPosition = function () {

    let topPixels = 0;
    let bottomPixels = 0;
    let leftPixels = 0;
    let rightPixels = 0;

    if (this.debugConfig.enabled) {
        topPixels = this.debugConfig.top;
        bottomPixels = this.debugConfig.bottom;
        leftPixels = this.debugConfig.left;
        rightPixels = this.debugConfig.right;
    } else {
        let famobiOffsets = { left: 0, top: 0, right: 0, bottom: 0 };
        if (window.GameInterface && window.GameInterface.getOffsets) {
            famobiOffsets = window.GameInterface.getOffsets();
        } else if (window.famobi && window.famobi.getOffsets) {
            famobiOffsets = window.famobi.getOffsets();
        }

        topPixels = famobiOffsets.top;
        bottomPixels = famobiOffsets.bottom;
        leftPixels = famobiOffsets.left;
        rightPixels = famobiOffsets.right;
    }


    const screenResHeight = this.useVisualViewport ? window.visualViewport.height : window.innerHeight;
    const screenResWidth = this.useVisualViewport ? window.visualViewport.width : window.innerWidth;

    leftPixels = Math.min(screenResWidth * 0.9, leftPixels);
    rightPixels = Math.min(screenResWidth * 0.9, rightPixels);
    topPixels = Math.min(screenResHeight * 0.9, topPixels);
    bottomPixels = Math.min(screenResHeight * 0.9, bottomPixels);

    const availableWidth = screenResWidth - leftPixels - rightPixels;
    const availableHeight = screenResHeight - topPixels - bottomPixels;

    this._currentCanvasWidth = availableWidth;
    this._currentCanvasHeight = availableHeight;

    this.app.setCanvasResolution(pc.RESOLUTION_FIXED, availableWidth, availableHeight);
    this.app.graphicsDevice.canvas.style.width = availableWidth + 'px';
    this.app.graphicsDevice.canvas.style.height = availableHeight + 'px';

    this.app.graphicsDevice.canvas.style.left = leftPixels + 'px';
    this.app.graphicsDevice.canvas.style.right = rightPixels + 'px';
    this.app.graphicsDevice.canvas.style.top = topPixels + 'px';
    this.app.graphicsDevice.canvas.style.bottom = bottomPixels + 'px';

    if (this.debugConfig.enabled) {
        console.log(`Canvas size set to ${availableWidth}x${availableHeight} (window ${window.innerWidth}x${window.innerHeight})`);
    }

    this.app.fire('famobi:resizeCanvas', availableWidth, availableHeight);

    this._backgroundColorUpdate();
};

FamobiSafeArea.prototype._backgroundColorUpdate = function () {
    if (!this.forceBodyBackgroundColor) return;
    const parentElement = this.app.graphicsDevice.canvas.parentElement;
    if (parentElement) {
        parentElement.style.background = this.bodyBackgroundColor.toString();
    }
}


FamobiSafeArea.prototype.update = function (dt) {

};


/** Fix for camera/input **/

pc.CameraComponent.prototype.screenToWorld = function (screenx, screeny, cameraz, worldCoord) {
    const device = this.system.app.graphicsDevice;
    const w = device.width / device.maxPixelRatio;
    const h = device.height / device.maxPixelRatio;
    return this._camera.screenToWorld(screenx, screeny, cameraz, w, h, worldCoord);
}


pc.CameraComponent.prototype.worldToScreen = function (worldCoord, screenCoord) {
    const device = this.system.app.graphicsDevice;
    const w = device.width / device.maxPixelRatio;
    const h = device.height / device.maxPixelRatio;
    return this._camera.worldToScreen(worldCoord, w, h, screenCoord);
}

// PauseOverlay.js
var PauseOverlay = pc.createScript('pauseOverlay');

PauseOverlay.prototype.initialize = function () {

};

PauseOverlay.prototype.postInitialize = function () {
    this.setPaused(APIMediator.isPaused());
    APIMediator.onPauseStateChange(isPaused => {
        this.setPaused(isPaused);
    });
};

PauseOverlay.prototype.setPaused = function (isPaused) {
    this.entity.element.enabled = isPaused;
    this.app.timeScale = isPaused ? 0 : 1;
};


PauseOverlay.prototype.update = function (dt) {

};



// StarsCounter.js
var StarsCounter = pc.createScript('starsCounter');

StarsCounter.prototype.initialize = function () {
    this.characterNameText = this.entity.findByName('CharacterNameText');
    this.starsAmountText = this.entity.findByName('StarsAmountText');

    this.entity.setPlayerName = this._setPlayerName.bind(this);
    this.entity.show = this._show.bind(this);
    this.entity.hide = this._hide.bind(this);

    this._hide(true);
};


StarsCounter.prototype._setPlayerName = function (name) {
    this.characterNameText.element.text = name;
}

StarsCounter.prototype._show = async function (starsAmount) {
    const duration = 0.5;
    this.entity.enabled = true;
    Utils.tweenText(this.starsAmountText, 0, starsAmount, 0.75, 0, pc.Linear, true);

    this.entity.setLocalScale(pc.Vec3.ZERO);
    this.entity.tween(this.entity.getLocalScale())
        .to(pc.Vec3.ONE, duration, pc.BackOut)
        .start();
};


StarsCounter.prototype._hide = function (immediately = false) {
    if (immediately) {
        this.entity.setLocalScale(pc.Vec3.ZERO);
        this.entity.enabled = false;
    } else {
        this.entity.tween(this.entity.getLocalScale())
            .to(pc.Vec3.ZERO, 0.1, pc.SineOut)
            .onComplete(() => {
                this.entity.enabled = false;
            })
            .start();
    }
};


StarsCounter.prototype.update = function (dt) {

};


// toggleButton.js
var ToggleButton = pc.createScript('toggleButton');

ToggleButton.attributes.add('iconCross', {
    type: 'entity'
});

ToggleButton.prototype.initialize = function() {
    if(!this.iconCross) return console.error('Set cross icon on toggle button ' + this.entity.path);

    this.entity.setToggle = this._setToggle.bind(this);
    this.entity.getToggleState = this._getToggleState.bind(this);
    this._setToggle(true);
};

ToggleButton.prototype._setToggle = function(toggle) {
    this._toggleState = toggle;
    this.iconCross.enabled = !this._toggleState;
};

ToggleButton.prototype._getToggleState = function() {
    return this._toggleState = toggle;
};

ToggleButton.prototype.update = function(dt) {

};



// Popup_Settings.js
class PopupSettings extends BaseWindow {

    initialize() {
        super.initialize();

        this.settingsPanel = this.entity.findByName('SettingsPanel');
        this.buttonClose = this.settingsPanel.findByName('CloseButton');
        this.languagePopup = this.entity.findByName('LanguageDropdownMenu');
        this.languagePopup.enabled = true;

        this.buttonSound = this.entity.findByName('SoundButton');
        this.buttonMusic = this.entity.findByName('MusicButton');
        this.buttonVibration = this.entity.findByName('VibrationButton');
        this.buttonPrivacyPolicy = this.entity.findByName('PrivacyPolicyButton');
        this.buttonChangeLanguage = this.entity.findByName('LanguageButton');
        this.buttonChangeLanguageText = this.buttonChangeLanguage.findByName('DisplayedLanguageNameText');

        this.buttonSound.on(EventTypes.BUTTON_PRESSED, this.onSoundPressed, this);
        this.buttonMusic.on(EventTypes.BUTTON_PRESSED, this.onMusicPressed, this);
        this.buttonVibration.on(EventTypes.BUTTON_PRESSED, this.onVibrationPressed, this);
        this.buttonPrivacyPolicy.on(EventTypes.BUTTON_PRESSED, this.onPrivacyPolicyPressed, this);
        this.buttonChangeLanguage.on(EventTypes.BUTTON_PRESSED, this.showLanguagePopup, this);


        BasicButton.assignAction(this.buttonClose, this.onClosePressed, this);

        this.app.on(EventTypes.LANGUAGE_SELECTED, this.onLanguageSelected, this);
        this.app.on(EventTypes.SOUND_STATE_CHANGED, this.updateSoundButtons, this);
        this.app.on(EventTypes.MUSIC_STATE_CHANGED, this.updateSoundButtons, this);
    }


    _initComponents() {
        super._initComponents();
    }

    _onShow() {
        this.languagePopup.enabled = false;
        
        super._onShow();

        this.updateButtonsVisibility();
        this.updateSoundButtons();
        this.updateVibrationButton();
    }

    _onAppeared() {

    }

    _onHide() {
        super._onHide();
    }

    showLanguagePopup() {
        this.languagePopup.enabled = true;
        this.languagePopup.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
    }

     onLanguageSelected(langCode, langDisplayName) {
        this.buttonChangeLanguageText.element.text = langDisplayName;
    }


    onSoundPressed() {
        if (SoundController.sfxEnabled) {
            this.app.fire(EventTypes.DISABLE_SFX);
        } else {
            this.app.fire(EventTypes.ENABLE_SFX);
        }
        this.updateSoundButtons();
        LocalStorageController.save();
    }

    onMusicPressed() {
        if (SoundController.musicEnabled) {
            this.app.fire(EventTypes.DISABLE_MUSIC);
        } else {
            this.app.fire(EventTypes.ENABLE_MUSIC);
        }
        this.updateSoundButtons();
        LocalStorageController.save();
    }

    onVibrationPressed() {
        const currentState = VibrationManager.getInstance().isVibrationEnabled();
        VibrationManager.getInstance().setVibrationEnabled(!currentState);
        this.updateVibrationButton();
        LocalStorageController.save();
    }

    onPrivacyPolicyPressed() {
        window.open('https://famobi.com/privacy');
    }

    onClosePressed() {
        this.entity.hide();
    }


    /* private */
    updateButtonsVisibility() {
        this.buttonVibration.enabled = VibrationManager.getInstance().isVibrationSupported() && GameConfig.getAttribute('UI', 'enableVibration');
        this.buttonPrivacyPolicy.enabled = APIMediator.isPrivacyPolicyEnabled();
        this.buttonSound.enabled = APIMediator.areAudioControlsAllowed();
        this.buttonMusic.enabled = APIMediator.areAudioControlsAllowed();
    }

    updateSoundButtons() {
        this.buttonSound.setToggle(SoundController.sfxEnabled);
        this.buttonMusic.setToggle(SoundController.musicEnabled);
    }

    updateVibrationButton() {
        this.buttonVibration.setToggle(VibrationManager.getInstance().isVibrationEnabled());
    }

    update(dt) {

    }
}

pc.registerScript(PopupSettings, 'popupSettings');

// HammerController.js
var HammerController = pc.createScript('hammerController');

HammerController.getInstance = function () {
    if (!HammerController._instance) console.error('HammerController is not initialized yet');
    return HammerController._instance;
};

HammerController.prototype.initialize = function () {
    HammerController._app = this.app;
    if (!HammerController._instance) {
        HammerController._instance = this;
    }

    this.hammer = this.entity.findByName('Hammer_EndGame');
    this.topContainer = this.entity.findByName('TopContainer');
    this.cityNameContainer = this.topContainer.findByName('CityNameContainer');
    this.hammerButton = this.hammer.findByName('button_hammer');
    this.innerHeartContainer = this.entity.findByName('HeartContainer');
    this.innerHeart = this.innerHeartContainer.findByName('heart');
    this.innerHeartLikesText = this.innerHeartContainer.findByName('HeartLikesText');
    this._heartContainerInitialPosition = this.innerHeartContainer.getLocalPosition().clone();
    this.smokeExplosionsContainer = this.entity.findByName('SmokeExplosionContainer');
    this.muzzleParticlesContainer = this.entity.findByName('MuzzleParticleSystem');
    this.confettiParticlesContainer = this.entity.findByName('ConfettiParticlesSystemContainer');
    this.checkpointsContainer = this.entity.findByName('Checkpoints');
    this.scaleSystem = this.entity.findByName('ScaleSystem');
    this.bottom = this.entity.findByName('00_bottom');
    this.lastRecordIndicator = this.entity.findByName('LastRecordIndicator');
    this.progressContainer = this.entity.findByName('Progress');
    this.progressBar = this.progressContainer.findByName('ProgressBar');

    this.checkpointStartY = 10;
    this.checkpointStep = 5;
    this.totalHeight = 25;
    this._lastRecordValue = 0;

    this.app.on(EventTypes.SET_NEXT_CITY, this._onNextCityRequested, this);
};

HammerController.prototype.postInitialize = function () {
    this.hammer.enabled = false;
}

HammerController.prototype.update = function (dt) {
};

HammerController.prototype._updateLastRecordPosition = function(localY) {
    const lastRecordPosition = this.lastRecordIndicator.getLocalPosition();
    lastRecordPosition.y = Math.max(lastRecordPosition.y, localY);
    this.lastRecordIndicator.setLocalPosition(lastRecordPosition);
};

HammerController.prototype.show = function () {
    this.hammer.enabled = true;

    /* set likes text */
    this.innerHeartLikesText.element.text = `${LikesManager.getInstance().getLikesAmountHumanizedText()}`;
    this.progressContainer.setLocalPosition(pc.Vec3.ZERO);

    /* particles */
    this.muzzleParticlesContainer.children.forEach(c => {
        c.particlesystem.stop();
    });

    /* show hammer */
    const hammerTargetPosition = PlatformManager.getInstance().getHammerPosition();
    this.entity.setPosition(hammerTargetPosition);
    const targetLocalPosition = this.entity.getLocalPosition().clone();
    this.entity.translateLocal(-7.5, 0, 5);
    this.entity.tween(this.entity.getLocalPosition())
        .to(targetLocalPosition, 1.0, pc.SineOut)
        .start();

    /* load audio */
    this._preloadAudio();

    /* heart anim */
    this.innerHeartContainer.enabled = false;

    /* rescale & build checkpoints */
    this._calculateData();

    /* last record */
    const lastRecordPosition = this.lastRecordIndicator.getLocalPosition();
    const neededLikes = DataManager.getInstance().getNeededLikesForNextChapter();
    const progressHeight = (this.totalHeight - this.checkpointStartY);
    lastRecordPosition.y = this.checkpointStartY + this._lastRecordValue / neededLikes * progressHeight;
    this.lastRecordIndicator.setLocalPosition(lastRecordPosition);
};

HammerController.prototype._preloadAudio = function () {
    AssetsLoader.getInstance().loadByTag('hammer_audio');
}

HammerController.prototype._calculateData = function () {
    const neededLikes = DataManager.getInstance().getNeededLikesForNextChapter();
    let baseCheckpointStep = 50;
    while (neededLikes / baseCheckpointStep > 20) {
        baseCheckpointStep += 50;
    }
    const totalCheckpoints = neededLikes / baseCheckpointStep;
    this.totalHeight = this.checkpointStartY + totalCheckpoints * this.checkpointStep;
    this._buildCheckpoints(totalCheckpoints, baseCheckpointStep, this.totalHeight);
}

HammerController.prototype.playHeartJumpingAnimation = async function () {
    this.innerHeartContainer.setPosition(PlatformManager.getInstance().getHeartHammerStartPosition());
    this.innerHeartContainer.enabled = true;
    this.innerHeartContainer.setLocalScale(pc.Vec3.ZERO);
    this.innerHeartContainer.tween(this.innerHeartContainer.getLocalScale())
        .to(pc.Vec3.ONE, 0.3, pc.BackOut)
        .start();

    const jumpAnimationDuration = 0.3;
    const jumpDuration = 0.8;

    this.innerHeart.anim.reset();
    this.innerHeart.anim.setTrigger('jump_heart', true);

    Utils.wait(jumpAnimationDuration * 1000).then(() => {
        this.innerHeartContainer.tween(this.innerHeartContainer.getLocalPosition())
            .to({ x: this._heartContainerInitialPosition.x, z: this._heartContainerInitialPosition.z }, jumpDuration, pc.SineInOut)
            .start();

        this.innerHeartContainer.tween(this.innerHeartContainer.getLocalPosition())
            .to({ y: this._heartContainerInitialPosition.y + 10 }, jumpDuration * 0.625, pc.SineOut)
            .start();

        Utils.wait(jumpDuration * 0.625 * 1000).then(() => {
            this.innerHeartContainer.tween(this.innerHeartContainer.getLocalPosition())
                .to({ y: this._heartContainerInitialPosition.y }, jumpDuration * 0.375, pc.SineIn)
                .start();
        });
    });

    Utils.wait(jumpAnimationDuration * 0.5 * 1000).then(() => {
        this.app.fire(EventTypes.PLAY_SFX, 'bounce_jump_start');
    });
    const totalWaitTime = jumpDuration + jumpAnimationDuration - 0.1;
    Utils.wait((totalWaitTime - 0.1) * 1000).then(() => {
        this.app.fire(EventTypes.PLAY_SFX, 'hammer_button');
    });

    await Utils.wait((jumpAnimationDuration + jumpDuration) * 1000);

    this.innerHeart.anim.setTrigger('scale_heart', true);

    this.hammerButton.anim.reset();
    this.hammerButton.anim.setTrigger('press', true);

    this.smokeExplosionsContainer.children.forEach(c => {
        c.particlesystem.reset();
        c.particlesystem.play();
    });

};

HammerController.prototype.playBarFillingAnimation = async function () {
    const neededLikes = DataManager.getInstance().getNeededLikesForNextChapter();
    const earnedLikes = LikesManager.getInstance().getNumLikes();
    const percentage = earnedLikes / neededLikes;
    const newChapterUnlocked = percentage >= 1;
    const hammerScale = this.hammer.getLocalScale().y;

    const indicatorTargetY = this.checkpointStartY + pc.math.clamp(percentage, 0, 1) * (this.totalHeight - this.checkpointStartY) + (newChapterUnlocked ? 0.75 : 0);
    const hammerTargetY = Math.min(15 - indicatorTargetY * hammerScale, 0);
    // const visualsTargetY = hammerTargetY + indicatorTargetY * hammerScale;
    const visualsTargetY = Math.max(indicatorTargetY * hammerScale - 2, 0);

    const coefficient = newChapterUnlocked ? 0.4 : 0.75;
    const indicatorGoingUpDuration = pc.math.clamp((1 * this.totalHeight / 35) * coefficient, 1.3, 7.5);
    const indicatorDelay = 0;
    const indicatorGoingUpEase = newChapterUnlocked ? pc.SineOut : pc.CubicOut;

    this.progressBar.setLocalScale(1, this.totalHeight, 1);
    this.progressContainer.setLocalPosition(pc.Vec3.ZERO);
    this.progressContainer.tween(this.progressContainer.getLocalPosition())
        .to({ y: indicatorTargetY }, indicatorGoingUpDuration, indicatorGoingUpEase)
        .delay(indicatorDelay)
        .onUpdate(() => this._updateLastRecordPosition(this.progressContainer.getLocalPosition().y))
        .start();

    const cameraDelay = 0.25;

    if (visualsTargetY > 15 * hammerScale) {
        const cameraTargetY = Math.max(visualsTargetY, MainCameraManager.getInstance().getCameraWorldPosition().y);
        MainCameraManager.getInstance().followHammerGameIndicator(cameraTargetY, indicatorGoingUpDuration, cameraDelay, indicatorGoingUpEase);

        // Player 
        const playerEase = indicatorGoingUpEase;
        const podiumEase = indicatorGoingUpEase;
        const playerTarget = Math.max(visualsTargetY - 3, PlayerController.getInstance().getPlayerCharacter().getPosition().y);
        const podiumTarget = Math.max(playerTarget - 1.05, PlatformManager.getInstance().podiumMovable.getPosition().y);

        const playerMoveDelay = (indicatorDelay + cameraDelay) * 0.65; //0.5F idi
        PlayerController.getInstance().movePlayerUpWithPodium(playerTarget, indicatorGoingUpDuration, playerMoveDelay, playerEase);

        PlatformManager.getInstance().movePodiumYForHammerGame(podiumTarget, indicatorGoingUpDuration, playerMoveDelay, podiumEase);
    }

    if (newChapterUnlocked) {
        Utils.wait((cameraDelay + indicatorGoingUpDuration - 1.2) * 1000).then(() => {
            this.app.fire(EventTypes.PLAY_SFX, 'rocket_whistle');
        })
    }

    await Utils.wait((cameraDelay + indicatorGoingUpDuration) * 1000);

    if (newChapterUnlocked) {
        this.muzzleParticlesContainer.children.forEach(c => {
            c.particlesystem.reset();
            c.particlesystem.play();
        });

        this.confettiParticlesContainer.children.forEach(subContainer => subContainer.children.forEach(c => {
            c.particlesystem.reset();
            c.particlesystem.play();
        }));

        this.app.fire(EventTypes.PLAY_SFX, 'firework_burst');
        this.app.fire(EventTypes.PLAY_SFX, 'peak_smaller');

        await Utils.wait(2000);

        await LocationsController.getInstance().showLocationUnlockScreen();
        this.hammer.enabled = false;
    } else {
        await Utils.wait(750);
        UIController.getInstance().showPopup(Constants.Screens.HAMMER_GAME);
        await UIController.getInstance().waitWhenScreenHidden(Constants.Screens.HAMMER_GAME);
        this.hammer.enabled = false;
    }
};



HammerController.prototype._buildCheckpoints = function (numCheckpoints, checkpointValueStep, totalHeight) {
    while (this.checkpointsContainer.children.length > 0) this.checkpointsContainer.children[this.checkpointsContainer.children.length - 1].destroy();

    for (let i = 0; i < numCheckpoints; i++) {
        const checkpoint = TemplateManager.getInstance().instantiate('HammerUICheckpoint');
        this.checkpointsContainer.addChild(checkpoint);
        checkpoint.setLocalPosition(-3.11, this.checkpointStartY + i * this.checkpointStep, 0.79);
        checkpoint.findByName('HeartsAmountText').element.text = LikesManager.getInstance().humanizeNumber(checkpointValueStep * i);
    };

    /* scale */
    this.scaleSystem.setLocalScale(1.5, 0.064 * totalHeight, 1.5);
    this.topContainer.setLocalPosition(0, totalHeight, 0);
    this.bottom.setLocalScale(1.2, 1.2, 0.1 * totalHeight);
};

HammerController.prototype._onNextCityRequested = function (cityKey) {
    /* set city icon in hammer */
    while (this.cityNameContainer.children.length > 0) this.cityNameContainer.children[this.cityNameContainer.children.length - 1].destroy();
    const cityNameInstance = TemplateManager.getInstance().instantiate('HammerCity_' + cityKey);
    this.cityNameContainer.addChild(cityNameInstance);
};


// TutorialGameplay.js
var TutorialGameplay = pc.createScript('tutorialGameplay');

TutorialGameplay.prototype.initialize = function () {
    this.hand = this.entity.findByName('TutorialHand');

    this.app.on(EventTypes.SHOW_GAMEPLAY_TUTORIAL_HAND, this.showTutorial, this);
    this.app.on(EventTypes.HIDE_GAMEPLAY_TUTORIAL_HAND, this.hideTutorial, this);
    this.app.on(EventTypes.LEVEL_RESET, this.hideTutorial, this);

    this.hand.enabled = false;
};

TutorialGameplay.prototype.showTutorial = function (worldPosition) {
    this.entity.setPosition(worldPosition);

    if (this.appearingTween && this.appearingTween.playing) this.appearingTween.stop();
    this.hand.element.opacity = 0;
    this.hand.enabled = true;
    this.appearingTween = this.hand.tween(this.hand.element)
        .to({ opacity: 1 }, 0.25, pc.SineOut)
        .start();
};

TutorialGameplay.prototype.hideTutorial = function (forced = false) {
    if (this.appearingTween && this.appearingTween.playing) this.appearingTween.stop();
    if (forced) {
        this.hand.enabled = false;
    } else {
        this.appearingTween = this.hand.tween(this.hand.element)
            .to({ opacity: 0 }, 0.125, pc.SineOut)
            .onComplete(() => this.hand.enabled = false)
            .start();
    }
};


TutorialGameplay.prototype.update = function (dt) {

};


// LocationConfig.js
var LocationConfig = pc.createScript('locationConfig');

LocationConfig.attributes.add('changeFog', {
    title: 'Change fog',
    type: 'boolean',
    default: true
});

LocationConfig.attributes.add('fogType', {
    type: 'string',
     enum: [
        { 'None': pc.FOG_NONE },
        { 'Linear': pc.FOG_LINEAR },
        { 'Exponential': pc.FOG_EXP },
        { 'Exponential squared': pc.FOG_EXP2 }
    ], 
    default: pc.FOG_LINEAR
})

LocationConfig.attributes.add('fogDensity', {
    title: 'Fog density (only for Exponential)',
    type: 'number',
    default: 0.01
});


LocationConfig.attributes.add('fogColor', {
    type: 'rgb',
    default: [0.7, 0.7, 0.7]
});

LocationConfig.attributes.add('fogDistance', {
    title: 'Fog density (only for Linear)',
    type: 'vec2',
    default: [25, 125]
});

LocationConfig.attributes.add('skybox', {
    type: 'asset',
    assetType: 'cubemap'
});

LocationConfig.prototype.initialize = function () {
    this.on('enable', this.applyCustomFog, this);
    this.on('attr', this.applyCustomFog, this);
    this.applyCustomFog();

    this.entity.retoreFogValues = this.retoreFogValues.bind(this);
};


LocationConfig.prototype.retoreFogValues = function () {
    this.applyCustomFog();
}

LocationConfig.prototype.applyCustomFog = function () {
    if (this.changeFog) {
        this.app.scene.fogColor = this.fogColor;
        this.app.scene.fog = this.fogType;
        this.app.scene.fogStart = this.fogDistance.x;
        this.app.scene.fogEnd = this.fogDistance.y;
        this.app.scene.fogDensity = this.fogDensity;
        if(this.skybox) {
            this.app.scene.setSkybox([this.skybox.resource]);
        }
    }
}

LocationConfig.prototype.update = function (dt) {

};


// LocationsController.js
var LocationsController = pc.createScript('locationsController');

function mapEnum(_enum) {
    var reverseLookup = {};
    var result = [];
    for (var value in _enum) {
        if (!_enum.hasOwnProperty(value)) continue;
        var enumEntry = {};
        enumEntry[value] = _enum[value];
        result.push(enumEntry);
        reverseLookup[_enum[value]] = value;
    }
    _enum.toString = function (value) { return reverseLookup[value]; };
    return result;
}

const cityTypesEnum = mapEnum({
    NewYork: "NewYork",
    Milan: "Milan",
    Paris: "Paris",
    London: "London",
    Rome: "Rome",
    Tokyo: "Tokyo",
    Moscow: "Moscow",
    Barcelona: "Barcelona",
    Cairo: "Cairo",
    Amsterdam: "Amsterdam",
    Shanghai: "Shanghai",
    Athens: "Athens",
    Guatemala: "Guatemala"
});

LocationsController.attributes.add('defaultLocation', {
    type: 'string',
    enum: cityTypesEnum,
    default: 'NewYork'
});

LocationsController.attributes.add('loadTestLocation', {
    title: 'Load test location',
    type: 'boolean',
    default: false
});

LocationsController.attributes.add('testLocation', {
    type: 'string',
    enum: cityTypesEnum,
    default: ''
});

LocationsController.attributes.add('locationsLibrary', {
    type: 'json',
    schema: [{
        name: 'city',
        type: 'string',
        enum: cityTypesEnum,
        default: 'NewYork'
    }, {
        name: 'template',
        type: 'asset',
        assetType: 'template'
    }],
    array: true
});


LocationsController.getInstance = function () {
    if (!LocationsController._instance) throw new Error('LocationsController is not initialized yet');
    return LocationsController._instance;
};

LocationsController.prototype.initialize = function () {
    LocationsController._app = this.app;
    if (!LocationsController._instance) {
        LocationsController._instance = this;
    }

    this._currentCity = undefined;
    this._nextCity = Constants.City.NewYork;

    this.on('attr:testLocation', this._switchToTestLocation, this);
    if (this.loadTestLocation) {
        this._switchToTestLocation();
    } else {
        // this.changeLocation(this.defaultLocation);
    }

    this.app.on(EventTypes.CHAPTER_CHANGED, this._onChapterChanged, this);
    this.app.on(EventTypes.GAME_DATA_READY, this._onGameDataReady, this);
    this.app.on(EventTypes.RESTORE_LOCATION_FOG, this._restoreLocationFog, this);
};

LocationsController.prototype._switchToTestLocation = function () {
    if (!this.loadTestLocation || !this.testLocation) return;
    console.error('Loading test location ' + this.testLocation);
    this.changeLocation(this.testLocation);
};

LocationsController.prototype._onChapterChanged = function () {
    this._prepareNextCity();
};

LocationsController.prototype._onGameDataReady = function () {
    const loadedCity = this.locationsLibrary[DataManager.getInstance().chapter % this.locationsLibrary.length].city;
    this.changeLocation(loadedCity);
    this._prepareNextCity();
};

LocationsController.prototype._prepareNextCity = function () {
    const nextChapter = DataManager.getInstance().chapter + 1;
    this._nextCity = this.locationsLibrary[nextChapter % this.locationsLibrary.length].city;
    this.app.fire(EventTypes.SET_NEXT_CITY, this._nextCity);
};

/**  update **/
LocationsController.prototype.update = function (dt) {

};

/** public  */

LocationsController.prototype.showLocationUnlockScreen = async function () {
    const uiAssetsTag = `ui_${this._nextCity}`;
    await AssetsLoader.getInstance().loadByTag(uiAssetsTag);

    UIController.getInstance().showPopup(Constants.Screens.CITY_UNLOCK);
    await UIController.getInstance().waitWhenScreenHidden(Constants.Screens.CITY_UNLOCK);
};

LocationsController.prototype.getNextCity = function () {
    if (!this._nextCity) console.error('Next city is undefined');
    return this._nextCity;
};

LocationsController.prototype.getHumanizedCityName = function (cityKey) {
    return Constants.CityNamesMapping[cityKey] || "COLOGNE";
};


LocationsController.prototype.requestCityAssetsLoading = function (cityKey) {
    console.error('started loading city assets ' + cityKey);
    AssetsLoader.getInstance().loadByTag(cityKey);
}

LocationsController.prototype.activateDesiredCityAndUnlockNextOne = function () {
    this.changeLocation(this._nextCity);
    DataManager.getInstance().chapter += 1;
    LocalStorageController.save();
    this._prepareNextCity();
};

LocationsController.prototype._restoreLocationFog = function() {
    if(this._activeLocation && this._activeLocation.retoreFogValues) this._activeLocation.retoreFogValues();
    if(this._locationMusicKey) {
        this.app.fire(EventTypes.PLAY_MUSIC, this._locationMusicKey);
    }
}

LocationsController.prototype.changeLocation = async function (cityName) {
    if (this._currentCity === cityName) {
        console.warn('Location ' + cityName + ' is already active');
        return;
    }

    this._currentCity = cityName;
    const locationRecord = this.locationsLibrary.find(x => x.city === this._currentCity);
    if (!locationRecord) return console.error('No location template: ' + cityName);
    const locationIndex = this.locationsLibrary.indexOf(locationRecord);

    AssetsLoader.getInstance().loadByTag(this._currentCity).then(() => {
        while (this.entity.children.length > 0) this.entity.children[this.entity.children.length - 1].destroy();

        try {
            const locationInstance = locationRecord.template.resource.instantiate();
            this.entity.addChild(locationInstance);
            locationInstance.setLocalEulerAngles(pc.Vec3.ZERO);
            locationInstance.setLocalPosition(pc.Vec3.ZERO);
            locationInstance.setLocalScale(pc.Vec3.ONE);
            this._activeLocation = locationInstance;
        } catch (e) {
            console.warn('Can not instantiate scene template: ' + locationRecord.city, e);
        }

        if(locationIndex !== -1) {
            this._locationMusicKey =  'melody' + (locationIndex % 13 + 1);
            this.app.fire(EventTypes.PLAY_MUSIC, this._locationMusicKey);
        }
        this.app.fire(EventTypes.LOCATION_CHANGED, this._currentCity);
    });
};






// Screen_CityUnlock.js
class ScreenCityUnlock extends BaseWindow {

    initialize() {
        super.initialize();

        this.cityContainer = this.entity.findByName('CityContainer');
        this.cityNameText = this.entity.findByName('CityName');

        this.continueContainer = this.entity.findByName('ContinueContainer');
        this.buttonContinue = this.continueContainer.findByName('ButtonContinue');

        this.buttonContinue.on(EventTypes.BUTTON_PRESSED, this.onContinuePressed, this);
    }


    _initComponents() {
        super._initComponents();
    }

    async _onShow() {

        super._onShow();

        const cityKey = LocationsController.getInstance().getNextCity();

        this.app.fire(EventTypes.PLAY_SFX, 'new_chapter_unlock');

        await this._loadAndShowCityContent(cityKey);

        LocationsController.getInstance().activateDesiredCityAndUnlockNextOne();

        this.continueContainer.enabled = false;
        Utils.wait(1500).then(() => {
            this.continueContainer.enabled = true;
            this.continueContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
        });
    }

    _onAppeared() {

    }

    _onHide() {
        super._onHide();
    }

    async _loadAndShowCityContent(cityKey) {
        this.cityNameText.element.text = `${LocationsController.getInstance().getHumanizedCityName(cityKey)}`;

        while (this.cityContainer.children.length > 0) this.cityContainer.children[this.cityContainer.children.length - 1].destroy();

        const cityInstance = TemplateManager.getInstance().instantiate('CityUnlock_' + cityKey);
        this.cityContainer.addChild(cityInstance);

        cityInstance.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
    }

    update(dt) {

    }

    onContinuePressed() {
        this.continueContainer.enabled = false;
        UIController.getInstance().hide(Constants.Screens.CITY_UNLOCK);
    }
}

pc.registerScript(ScreenCityUnlock, 'screenCityUnlock');

// LikesManager.js
var LikesManager = pc.createScript('likesManager');


LikesManager.getInstance = function () {
    if (!LikesManager._instance) console.error('LikesManager is not initialized yet');
    return LikesManager._instance;
};

LikesManager.prototype.initialize = function () {
    LikesManager._app = this.app;
    if (!LikesManager._instance) {
        LikesManager._instance = this;
    }

    this.mainCamera = CameraController.getInstance().getCameraByName(Constants.Cameras.MAIN);
    this.heartsSpawnerTarget = this.mainCamera.findByName('HeartsSpawnerPosition');

    this.heart = this.entity.findByName('Heart');
    this.heartAnimated = this.heart.findByName('HeartAnimated');
    this.likesAmountText = this.heart.findByName('LikesAmountText');

    this.heart.enabled = false;
    this.numLikes = 0;

    this._nextViewUpdateTimeout = 0;

    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
};

LikesManager.prototype.reset = function () {
    this.numLikes = 0;
};

LikesManager.prototype.getNumLikes = function () {
    return this.numLikes;
};

LikesManager.prototype.getLikesAmountHumanizedText = function () {
    return this.humanizeNumber(this.numLikes);
};

LikesManager.prototype.showGameplayHeart = function () {
    this.viewMode = 'gameplay';
    this.heart.enabled = true;
    this.heart.setLocalScale(pc.Vec3.ZERO);
    this._updateLikesView();
    this.heart.tween(this.heart.getLocalScale())
        .to(pc.Vec3.ONE, 0.5, pc.BackOut)
        .start()
}

LikesManager.prototype.hideGameplayHeart = function () {
    this.heart.enabled = true;
    this.heart.tween(this.heart.getLocalScale())
        .to(pc.Vec3.ZERO, 0.425, pc.BackIn)
        .onComplete(() => {
            this.viewMode = undefined;
            this.heart.enabled = false;
        })
        .start()
}

LikesManager.prototype.rewardClothesSelection = function() {
    this.numLikes += DataManager.getInstance().getLikesPerSelection();
};

LikesManager.prototype.tick = function (dt) {
    this.numLikes += DataManager.getInstance().getLikesRate() * dt;

    this._nextViewUpdateTimeout -= dt;
    if (this._nextViewUpdateTimeout <= 0) {
        this._updateLikesView();
        this._nextViewUpdateTimeout = pc.math.random(0.175, 0.350);
    }
}

LikesManager.prototype.humanizeNumber = function (num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + "M";
    }

    if (num >= 100000) {
        return this.humanizeNumber(num / 1000) + "K";
    }

    if (num >= 1000) {
        return (num / 1000).toFixed(2) + "K";
    }

    return num.toFixed(0);
};

LikesManager.prototype._updateLikesView = function () {
    this.likesAmountText.element.text = '' + this.humanizeNumber(this.numLikes);
    APIMediator.sendScore(Math.floor(this.numLikes));
}

LikesManager.prototype.update = function (dt) {
    if (this.viewMode === 'gameplay') {
        this.tick(dt);
    }
};

LikesManager.prototype.postUpdate = function (dt) {
    if (this.viewMode === 'gameplay') {
        this.heart.setPosition(this.heartsSpawnerTarget.getPosition());
        this.heart.setRotation(this.heartsSpawnerTarget.getRotation());
    }
};

// overrideExponentialFog.js
pc.shaderChunks.fogExpPS = `
uniform vec3 fog_color;
uniform float fog_density;
float dBlendModeFogFactor = 1.0;

vec3 addFog(vec3 color) {
    float depth = gl_FragCoord.z / gl_FragCoord.w - 5.0;
    float fogFactor = exp(-depth * fog_density);
    fogFactor = clamp(fogFactor, 0.0, 1.0);
    return mix(fog_color * dBlendModeFogFactor, color, fogFactor);
}
`;

// Screen_HammerGame.js
class ScreenHammerGame extends BaseWindow {

    initialize() {
        super.initialize();

        this.buttonContinue = this.entity.findByName('ButtonContinue');

        this.buttonContinue.on(EventTypes.BUTTON_PRESSED, this.onContinuePressed, this);
    }


    _initComponents() {
        super._initComponents();
    }

    _onShow() {
        super._onShow();

        this.buttonContinue.setAvailable(true);
        this.buttonContinue.enabled = true;
        this.buttonContinue.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
    }

    _onAppeared() {

    }

    _onHide() {
        super._onHide();
    }

    update(dt) {

    }

    onContinuePressed() {        
        this.buttonContinue.enabled = false;
        this.buttonContinue.setAvailable(false);

        APIMediator.showInterstitialAd('button:victory:continue').then(() => {
            UIController.getInstance().hide(Constants.Screens.HAMMER_GAME);
        });
    }
}

pc.registerScript(ScreenHammerGame, 'screenHammerGame');

// GameSpeedDebugger.js
var GameSpeedDebugger = pc.createScript('gameSpeedDebugger');


GameSpeedDebugger.prototype.initialize = function() {
    console.error('Game speed debugger is active!');
};

GameSpeedDebugger.prototype.update = function(dt) {
    if(this.app.keyboard.isPressed(pc.KEY_1)) {
        this.app.timeScale = 5;
    } else if(this.app.keyboard.isPressed(pc.KEY_2)) {
        this.app.timeScale = 10;
    } else if(this.app.keyboard.isPressed(pc.KEY_3)) {
        this.app.timeScale = 0.1;
    }  else {
        this.app.timeScale = 1;
    }
};


// ConceptManager.js
var ConceptManager = pc.createScript('conceptManager');

ConceptManager.BASIC_CONCEPTS = [
    Constants.Concepts.NightClub,
    Constants.Concepts.Sport,
    Constants.Concepts.Gala,
    Constants.Concepts.Formal,
    Constants.Concepts.Date
];

ConceptManager.EXTRA_CONCEPTS = [];

ConceptManager.UNLOCKABLE_CONCEPTS = [
    Constants.Concepts.Beach,
    Constants.Concepts.Eighties,
    Constants.Concepts.PyjamaParty,
    Constants.Concepts.School,
    Constants.Concepts.Winter,
    Constants.Concepts.Masculine,
    Constants.Concepts.Spring,
    Constants.Concepts.Fifties,
    Constants.Concepts.Teen,
    Constants.Concepts.Christmas,
    Constants.Concepts.Western,
    Constants.Concepts.Cyberpunk,
    Constants.Concepts.Halloween,
    Constants.Concepts.Festival,
    Constants.Concepts.FashionWeek,
    Constants.Concepts.Viking,
    Constants.Concepts.OldMoney,
];

ConceptManager.getInstance = function () {
    if (!ConceptManager._instance) console.error('ConceptManager is not initialized yet');
    return ConceptManager._instance;
};

ConceptManager.prototype.initialize = function () {
    ConceptManager._app = this.app;
    if (!ConceptManager._instance) {
        ConceptManager._instance = this;
    }

    /* determine extra concepts */
    Object.keys(Constants.Concepts).filter(key => ConceptManager.BASIC_CONCEPTS.indexOf(key) === -1 && ConceptManager.UNLOCKABLE_CONCEPTS.indexOf(key) === -1).forEach(key => ConceptManager.EXTRA_CONCEPTS.push(key));

    this._unlockableConcepts = ConceptManager.UNLOCKABLE_CONCEPTS.slice();
    this._updateAvailableConcepts();
    this._nextUnlockableConcept = null;
    this._prevUnlockProgress = 0;
    this._conceptUnlockProgress = 0;

    this._conceptLoop = this._availableConcepts.slice();

    this.app.on(EventTypes.LEVEL_FINISHED, this.onLevelFinished, this);
    this.app.on(EventTypes.LEVEL_CHANGED, this.onLevelNumberChanged, this);
    this.app.once(EventTypes.SAVEDATA_LOADED, this._loadConceptLoop, this);
};

ConceptManager.prototype._loadConceptLoop = function () {
    this._updateAvailableConcepts();

    this._unlockableConcepts = LocalStorageController.getSavedValue(Constants.Storage.UNLOCKABLE_CONCEPTS) || ConceptManager.UNLOCKABLE_CONCEPTS.slice();
    this._unlockableConcepts = this._unlockableConcepts.filter(x => x !== Constants.Concepts.Bohemian); //remove bohemian
    this._conceptUnlockProgress = LocalStorageController.getSavedValue(Constants.Storage.CONCEPT_UNLOCK_PROGRESS) || 0;
    this._conceptLoop = LocalStorageController.getSavedValue(Constants.Storage.CONCEPT_LOOP) || [];

    /* verify loaded data */
    if (!this._conceptLoop || this._conceptLoop.length < 1) {
        this._rebuildConceptLoop();
    }
};

ConceptManager.prototype._rebuildConceptLoop = function (shuffle = false) {
    // console.log('rebuilding concept loop (shuffle: ' + shuffle + ')...');
    this._conceptLoop = this._availableConcepts.slice();
    if(shuffle) {
        Utils.shuffle(this._conceptLoop);
    }
};

ConceptManager.prototype._updateAvailableConcepts = function() {
    const extraConceptsAmount = Math.floor(DataManager.getInstance().level / GameConfig.getAttribute('concepts', 'extraConceptAfterEachXLevels'));
    const _extraConcepts = ConceptManager.EXTRA_CONCEPTS.slice(0, extraConceptsAmount);
    const _unlockedConcepts = ConceptManager.UNLOCKABLE_CONCEPTS.filter(key => this._unlockableConcepts.indexOf(key) === -1);
    this._availableConcepts = [...ConceptManager.BASIC_CONCEPTS, ..._extraConcepts, ..._unlockedConcepts];
}


/** public */

ConceptManager.prototype.getCurrentConceptType = function() {
    return this._conceptLoop[0];  
};

ConceptManager.prototype.getUnlockableConceptType = function() {
    return this._unlockableConcepts[0];  
};

ConceptManager.prototype.getAvailableConceptsList = function() {
    return this._availableConcepts.slice();
};

ConceptManager.prototype.jumpToNextConcept = function() {
    let currentConceptType = this._conceptLoop[0];
    if(this._conceptLoop.length > 0) {
        currentConceptType = this._conceptLoop.shift();
    };

    LevelManager.getInstance().increaseConceptLevel(currentConceptType);
    if(this._conceptLoop.length === 0) this._rebuildConceptLoop(true);
}

ConceptManager.prototype.onLevelFinished = function(playerWon) {
    let currentConceptType = this._conceptLoop[0];
    if(this._conceptLoop.length > 0) {
        currentConceptType = this._conceptLoop.shift();
    };

    LevelManager.getInstance().increaseConceptLevel(currentConceptType);

    if(playerWon) {
        this._prevUnlockProgress = this._conceptUnlockProgress;
        this._conceptUnlockProgress += 25;
    }
    if(this._conceptLoop.length === 0) this._rebuildConceptLoop(true);
    LocalStorageController.save();
};


ConceptManager.prototype.onLevelNumberChanged = function() {
    this._updateAvailableConcepts();
};

ConceptManager.prototype.unlockNextConceptIfNeeded = async function() {
    if(this._unlockableConcepts.length > 0) {
        UIController.getInstance().showPopup(Constants.Screens.CONCEPT_UNLOCK);
        await UIController.getInstance().waitWhenScreenHidden(Constants.Screens.CONCEPT_UNLOCK);
    } else {
        Debug.warn('no unlockable concepts');
    }
};


ConceptManager.prototype.unlockConcept = function(conceptName, prependToList = true) {
    Debug.log('unlocking concept ' + conceptName + '...');
    this._conceptUnlockProgress = 0;
    this._unlockableConcepts = this._unlockableConcepts.filter(x => x !== conceptName);
    this._updateAvailableConcepts();

    if(prependToList) {
        this._conceptLoop = [conceptName, ...this._conceptLoop];
    }

    LocalStorageController.save();
};

/* saving */
ConceptManager.prototype.getConceptLoop = function () {
    return this._conceptLoop;
};

ConceptManager.prototype.getUnlockableConcepts = function() {
    return this._unlockableConcepts.slice();
};

ConceptManager.prototype.getPrevConceptProgress = function() {
    return this._prevUnlockProgress;
};

ConceptManager.prototype.getNextConceptProgress = function() {
    return this._conceptUnlockProgress;
};

ConceptManager.prototype.update = function (dt) {

};


// Screen_ConceptUnlock.js
class ScreenConceptUnlock extends BaseWindow {

    initialize() {
        super.initialize();

        this.conceptContainer = this.entity.findByName('ConceptContainer');
        this.conceptEmpty = this.conceptContainer.findByName('ConceptEmpty');
        this.conceptMask = this.conceptContainer.findByName('ConceptMask');
        this.conceptFill = this.conceptContainer.findByName('ConceptFill');
        this.conceptUnlocked = this.conceptContainer.findByName('ConceptUnlocked');

        this.explosiveParticles = this.entity.findByName('ExplosiveParticles');
        this.sparklesParticles = this.entity.findByName('SparklesParticles');

        this.percentageText = this.entity.findByName('PercentageText');

        this.buttonsContainer = this.entity.findByName('ButtonsContainer');
        this.buttonNext = this.buttonsContainer.findByName('ButtonNext');
        this.buttonRewardedUnlock = this.buttonsContainer.findByName('ButtonRewardedUnlock');
        this.buttonNoThanks = this.buttonsContainer.findByName('ButtonNoThanks');

        this.buttonNext.on(EventTypes.BUTTON_PRESSED, this.onNextPressed, this);
        this.buttonRewardedUnlock.on(EventTypes.BUTTON_PRESSED, this.onRewardedUnlockPressed, this);
        this.buttonNoThanks.on(EventTypes.BUTTON_PRESSED, this.onNoThanksPressed, this);
        this.app.on(EventTypes.LEVEL_FINISHED, this.onLevelFinished, this);
    }

    onLevelFinished() {
        this._preloadConceptAssets(ConceptManager.getInstance().getUnlockableConceptType(), true);
    }


    _initComponents() {
        super._initComponents();
    }

    async _onShow() {

        super._onShow();

        this._rewardedAdWatched = false;
        this._conceptUnlocked = false;
        this.buttonsContainer.enabled = false;
        this.explosiveParticles.enabled = false;
        this.sparklesParticles.enabled = false;

        this.percentageText.element.text = ``;

        this.app.stopAllTweens(this.conceptContainer);
        this.conceptContainer.setLocalScale(pc.Vec3.ONE);

        const prevProgress = ConceptManager.getInstance().getPrevConceptProgress();
        const currentProgress = ConceptManager.getInstance().getNextConceptProgress();
        const conceptKey = ConceptManager.getInstance().getUnlockableConceptType();

        this.percentageText.element.text = `${Math.floor(prevProgress)}%`;

        await this._loadAndShowConceptContent(conceptKey, prevProgress, currentProgress);
        await this._tweenProgress(prevProgress, currentProgress);

        Utils.wait(500).then(() => {
            this.buttonsContainer.enabled = true;
            this.buttonsContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
        });
    }

    _onAppeared() {

    }

    _onHide() {
        super._onHide();
    }

    async _loadAndShowConceptContent(conceptKey, prevProgress, currentProgress) {
        this.conceptEmpty.enabled = false;
        this.conceptMask.enabled = false;
        this.conceptFill.enabled = false;
        this.conceptUnlocked.enabled = false;

        await this._preloadConceptAssets(conceptKey, true);

        this.conceptMask.getLocalPosition().y = -this.conceptEmpty.element.height / 2;

        this.conceptEmpty.enabled = true;
        this.conceptMask.enabled = true;
        this.conceptFill.enabled = true;
        this.conceptUnlocked.enabled = false;
    }

    async _preloadConceptAssets(conceptKey, assignAssets = true) {
        if (!conceptKey) return;
        try {
            const assetEmpty = this.app.assets.find(`${conceptKey}_empty`, 'sprite');
            const assetFill = this.app.assets.find(`${conceptKey}_fill`, 'sprite');
            const assetUnlocked = this.app.assets.find(`${conceptKey}_unlocked`, 'sprite');

            const textureAtlasAsset = this.app.assets.get(assetEmpty.data.textureAtlasAsset);

            await AssetsLoader.getInstance().loadAssets([textureAtlasAsset, assetEmpty, assetFill, assetUnlocked]);

            if (assignAssets) {
                Utils.setSpriteElement(this.conceptEmpty, assetEmpty);
                Utils.setSpriteElement(this.conceptFill, assetFill);
                Utils.setSpriteElement(this.conceptUnlocked, assetUnlocked);
            }
        } catch (e) {
            console.warn('Something went wrong while preloading concept ' + conceptKey + ' assets', e);
        }
    }

    async _tweenProgress(prevProgress, currentProgress) {
        return new Promise((resolve, reject) => {
            const tweenDuration = 1.0;
            const progressHolder = { value: prevProgress };
            this._lastProgress = currentProgress || 0;
            this.entity.tween(progressHolder)
                .to({ value: currentProgress }, tweenDuration, pc.SineOut)
                .onUpdate(() => {
                    this.percentageText.element.text = `${Math.floor(progressHolder.value)}%`;
                    this.conceptMask.element.height = this.conceptEmpty.element.height * pc.math.clamp(progressHolder.value / 100, 0, 1);
                }).onComplete(() => {
                    this.percentageText.element.text = `${Math.floor(progressHolder.value)}%`;
                    this.conceptMask.element.height = this.conceptEmpty.element.height * pc.math.clamp(progressHolder.value / 100, 0, 1);

                    if (currentProgress >= 100) {
                        this.conceptUnlocked.enabled = true;
                        this.conceptUnlocked.element.opacity = 0;
                        Utils.tweenOpacity(this.conceptUnlocked, 1, 0.35, pc.Linear);

                        this.app.fire(EventTypes.PLAY_SFX, 'new_chapter_unlock');

                        Utils.tweenScale(this.conceptContainer, new pc.Vec3(1.15, 1.15, 1.15), 2.0, pc.SineOut);

                        /* unlock concept */
                        const conceptType = ConceptManager.getInstance().getUnlockableConceptType();
                        ConceptManager.getInstance().unlockConcept(conceptType, true);
                        this._conceptUnlocked = true;

                        /* show concept name */
                        this.percentageText.element.key = `${conceptType}`;
                        this.percentageText.setLocalScale(pc.Vec3.ZERO);
                        Utils.tweenScale(this.percentageText, pc.Vec3.ONE, 0.5, pc.BackOut);

                        /* particles */

                        this.explosiveParticles.enabled = true;
                        this.explosiveParticles.children.forEach(x => {
                            x.particlesystem.reset();
                            x.particlesystem.play();
                        });
                        this.sparklesParticles.enabled = true;
                        this.sparklesParticles.children.forEach(x => {
                            x.particlesystem.reset();
                            x.particlesystem.play();
                        });
                    }
                    resolve();
                })
                .start();
        })

    }

    update(dt) {
        if (this.buttonsContainer.enabled) {
            if (this._rewardedAdWatched || this._conceptUnlocked) {
                this.buttonNext.enabled = true;
                this.buttonRewardedUnlock.enabled = false;
                this.buttonNoThanks.enabled = false;
            } else {
                if (APIMediator.isRewardedAdAvailable('button:concept_unlock:unlock')) {
                    this.buttonNext.enabled = false;
                    this.buttonRewardedUnlock.enabled = true;
                    this.buttonNoThanks.enabled = true;
                } else {
                    this.buttonNext.enabled = true;
                    this.buttonRewardedUnlock.enabled = false;
                    this.buttonNoThanks.enabled = false;
                }
            }
        }
    }

    exit() {
        this.buttonsContainer.enabled = false;
        UIController.getInstance().hide(Constants.Screens.CONCEPT_UNLOCK);

        this._preloadConceptAssets(ConceptManager.getInstance().getUnlockableConceptType(), false);
    }

    async onRewardedUnlockPressed() {
        this.buttonsContainer.enabled = false;

        const result = await APIMediator.watchRewardedVideo('button:concept_unlock:unlock');
        if (result) {
            this._rewardedAdWatched = true;

            this.buttonsContainer.enabled = false;
            await this._tweenProgress(this._lastProgress, 100);

            Utils.wait(350).then(() => {
                this.buttonsContainer.enabled = true;
                this.buttonsContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
            });
        } else {
            this.buttonsContainer.enabled = true;
        }
    }

    onNoThanksPressed() {
        this.exit();
    }

    onNextPressed() {
        this.exit();
    }
}

pc.registerScript(ScreenConceptUnlock, 'screenConceptUnlock');

// LevelManager.js
var LevelManager = pc.createScript('levelManager');

LevelManager.attributes.add('testLevel', {
    type: 'entity',
    title: 'Test level'
});

LevelManager.getInstance = function () {
    if (!LevelManager._instance) console.error('LevelManager is not initialized yet');
    return LevelManager._instance;
};

LevelManager.prototype.initialize = function () {
    LevelManager._app = this.app;
    if (!LevelManager._instance) {
        LevelManager._instance = this;
    }

    this.levelsList = [];
    this.levelsByConcept = new Map();
    this.conceptLevels = new Map();

    this._parseLevels();


    this.app.once(EventTypes.SAVEDATA_LOADED, this._loadConceptLevels, this);
};

LevelManager.prototype.postInitialize = function () {
};

LevelManager.prototype._parseLevels = function () {
    this.levelsList = this.entity.find(node => node.script && node.script.levelData);

    /* sort by concept */
    this.levelsList.forEach(preset => {
        const concept = preset.script.levelData.concept;

        let category = this.levelsByConcept.get(concept);
        if (!category) {
            category = [preset];
            this.levelsByConcept.set(concept, category);
        } else {
            category.push(preset);
        }
    });
};

LevelManager.prototype._extractLevelData = async function (levelEntity) {
    if (this.testLevel) {
        console.error('Loading test level: ' + this.testLevel.name);
        return this.testLevel.getDataObject();
    }

    if (!levelEntity.script || !levelEntity.script.levelData) {
        console.error(`No levelData for level '${levelEntity.path}'`);
        return null;
    }

    if (!levelEntity._levelDataReady) {
        await this._waitUntilLevelDataLoaded(levelEntity);
    }

    return levelEntity.getDataObject();
};

LevelManager.prototype._waitUntilLevelDataLoaded = function (levelEntity) {
    return new Promise((resolve, reject) => {
        levelEntity.once('levelDataReady', () => {
            resolve();
        })
    });
}

/** public */
LevelManager.prototype.getCurrentLevelData = async function () {
    const currentConcept = ConceptManager.getInstance().getCurrentConceptType();
    const level = this.getCurrentLevelByConcept(currentConcept);
    return this._extractLevelData(level);
};

LevelManager.prototype.getRandomLevelData = function () {
    const availableConcepts = ConceptManager.getInstance().getAvailableConceptsList();
    const randomConcept = Utils.getRandomItem(availableConcepts);
    const level = this.getCurrentLevelByConcept(randomConcept);
    return this._extractLevelData(level);
};

LevelManager.prototype.getCurrentLevelByConcept = function (concept) {
    const levelsList = this.levelsByConcept.get(concept);
    const conceptLevel = this.getConceptLevel(concept);
    return levelsList[conceptLevel % levelsList.length];
}

LevelManager.prototype.increaseConceptLevel = function (concept) {
    const conceptLevel = this.getConceptLevel(concept);
    this.conceptLevels.set(concept, conceptLevel + 1);
    LocalStorageController.save();
};

LevelManager.prototype.getDebugInfo = function () {
    if (this.testLevel) {
        return `${this.testLevel.name} [TEST]`
    } else {
        const currentConcept = ConceptManager.getInstance().getCurrentConceptType();
        const levelsList = this.levelsByConcept.get(currentConcept);
        const conceptLevel = this.getConceptLevel(currentConcept);
        const levelIndex = conceptLevel % levelsList.length;
        const level = levelsList[levelIndex];
        return `${level.name} [${levelIndex}/${levelsList.length}]`
    }
};


LevelManager.prototype.getConceptLevel = function (concept) {
    return this.conceptLevels.get(concept) || 0;
};

/* save/load data */
LevelManager.prototype._loadConceptLevels = function () {
    const saveData = LocalStorageController.getSavedValue(Constants.Storage.CONCEPT_LEVELS) || {};
    for (let key in saveData) {
        this.conceptLevels.set(key, +saveData[key]);
    }
};

LevelManager.prototype.getConceptLevelsSaveData = function () {
    const object = {};
    this.conceptLevels.forEach((value, key) => {
        object[key] = value;
    })
    return object;
};

LevelManager.prototype.update = function (dt) {

};

// Screen_Shop.js
class ScreenShop extends BaseWindow {

    initialize() {
        super.initialize();

        this.categoriesContainer = this.entity.findByName('CategoriesContainer');
        this.buttonBack = this.entity.findByName('ButtonBack');

        this._activeCategoryKey = null;
        this._activeCategory = null;
        this.categoryPanels = new Map();
        this.categoriesContainer.children.forEach(x => {
            /* enable for initialization */
            x.enabled = true;
            this.categoryPanels.set(x.name.replace('Category', ''), x);
        });

        this.buttonBack.on(EventTypes.BUTTON_PRESSED, this.onBackPressed, this);
        this.app.on(EventTypes.SHOP_CATEGORY_SELECTED, this.switchToCategory, this);
        this.app.on(EventTypes.SHOP_TAB_SELECTED, this.switchToTab, this);
    }


    _initComponents() {
        super._initComponents();
    }

    _onShow() {
        super._onShow();

        this.app.fire(EventTypes.ENTER_SHOP);

        /* open last viewed category */
        this.app.fire(EventTypes.SHOP_CATEGORY_SELECTED, this._activeCategoryKey || Constants.ShopCategory.Models, true);

        CameraController.getInstance().changeCamera(Constants.Cameras.SHOP);
    }

    _onAppeared() {

    }

    _onHide() {
        super._onHide();
    }

    /* private */
    switchToCategory(categoryKey, instantly = false) {
        this._activeCategoryKey = categoryKey;
        this._activeCategory = this.categoryPanels.get(categoryKey);
        this.categoryPanels.forEach(x => (x === this._activeCategory) ? x.show(instantly) : x.hide());
    }

    switchToTab(tabKey, categoryKey, instantly = false) {
        if (this._activeCategory) {
            this._activeCategory.switchToTab(tabKey, categoryKey, instantly);
        }
    }


    update(dt) {

    }

    onBackPressed() {
        LevelController.getInstance().exitToMainMenu(() => {
            this.app.fire(EventTypes.QUIT_SHOP);
        });
    }
}

pc.registerScript(ScreenShop, 'screenShop');

// ShopManager.js
var ShopManager = pc.createScript('shopManager');

ShopManager.attributes.add('fogColor', {
    type: 'rgb',
    default: [1, 1, 1]
});

ShopManager.attributes.add('fogStart', {
    type: 'number',
    default: 50
});

ShopManager.attributes.add('fogEnd', {
    type: 'number',
    default: 300
});

ShopManager.attributes.add('testModelSet', {
    type: 'string',
});

ShopManager.attributes.add('modelsCollection', {
    type: 'json',
    schema: [{
        name: 'name',
        type: 'string',
        default: ''
    }, {
        name: 'defaultState',
        type: 'number',
        enum: [
            { 'Locked': 0 },
            { 'Owned': 1 },
            { 'Equipped': 2 }
        ],
        default: 0
    }, {
        name: 'isDefault',
        type: 'boolean',
        default: false
    }, {
        name: 'tab',
        type: 'string',
        enum: [
            { 'Basic': "Basic" },
            { 'Star': 'Star' },
            { 'Premium': 'Premium' },
            { 'Angels': 'Angels' }
        ],
        default: 'Basic'
    }, {
        name: 'unlockType',
        type: 'number',
        enum: [
            { 'Purchase': 0 },
            { 'Random Unlock': 1 },
            { 'Rewarded': 2 }
        ],
        default: 0
    }, {
        name: 'price',
        type: 'number',
        default: 0
    }, {
        name: 'skinType',
        type: 'number',
        enum: [
            { 'Replace Materials Only': 0 },
            { 'External Template': 1 }
        ],
        default: 0
    }, {
        name: 'skinMaterial',
        type: 'asset',
        assetType: 'material'
    }, {
        name: 'bikiniTopMaterial',
        type: 'asset',
        assetType: 'material'
    }, {
        name: 'bikiniBottomMaterial',
        type: 'asset',
        assetType: 'material'
    }, {
        name: 'template',
        type: 'asset',
        assetType: 'template'
    }, {
        name: 'icon',
        type: 'asset',
        assetType: 'sprite'
    }],

    array: true
});


ShopManager.attributes.add('effectsCollection', {
    type: 'json',
    schema: [{
        name: 'name',
        type: 'string',
        default: ''
    }, {
        name: 'defaultState',
        type: 'number',
        enum: [
            { 'Locked': 0 },
            { 'Owned': 1 },
            { 'Equipped': 2 }
        ],
        default: 0
    }, {
        name: 'tab',
        type: 'string',
        enum: [
            { 'Basic': "Basic" }
        ],
        default: "Basic"
    }, {
        name: 'unlockType',
        type: 'number',
        enum: [
            { 'Purchase': 0 },
            { 'Random Unlock': 1 },
            { 'Rewarded': 2 }
        ],
        default: 0
    }, {
        name: 'price',
        type: 'number',
        default: 0
    },{
        name: 'requiredLevel',
        type: 'number',
        default: 0
    }, {
        name: 'effectNameKey',
        type: 'string',
        default: ""
    }, {
        name: 'assignRootBone',
        type: 'boolean',
        default: false
    }, {
        name: 'template',
        type: 'asset',
        assetType: 'template'
    }, {
        name: 'icon',
        type: 'asset',
        assetType: 'sprite'
    }],

    array: true
});



ShopManager.attributes.add('finishersCollection', {
    type: 'json',
    schema: [{
        name: 'name',
        type: 'string',
        default: ''
    }, {
        name: 'defaultState',
        type: 'number',
        enum: [
            { 'Locked': 0 },
            { 'Owned': 1 },
            { 'Equipped': 2 }
        ],
        default: 0
    }, {
        name: 'tab',
        type: 'string',
        enum: [
            { 'Basic': "Basic" },
            { 'Premium': 'Premium' }
        ],
        default: "Basic"
    }, {
        name: 'unlockType',
        type: 'number',
        enum: [
            { 'Purchase': 0 },
            { 'Random Unlock': 1 },
            { 'Rewarded': 2 }
        ],
        default: 0
    }, {
        name: 'price',
        type: 'number',
        default: 0
    }, {
        name: 'finisherNameKey',
        type: 'string',
        default: ""
    }, {
        name: 'animationTriggerKey',
        type: 'string',
        default: ""
    }, {
        name: 'assignRootBone',
        type: 'boolean',
        default: true
    }, {
        name: 'template',
        type: 'asset',
        assetType: 'template'
    }, {
        name: 'icon',
        type: 'asset',
        assetType: 'sprite'
    }, {
        name: 'iconLocked',
        type: 'asset',
        assetType: 'sprite'
    }],
    array: true
});


ShopManager.attributes.add('petsCollection', {
    type: 'json',
    schema: [{
        name: 'name',
        type: 'string',
        default: ''
    }, {
        name: 'defaultState',
        type: 'number',
        enum: [
            { 'Locked': 0 },
            { 'Owned': 1 },
            { 'Equipped': 2 }
        ],
        default: 0
    }, {
        name: 'tab',
        type: 'string',
        enum: [
            { 'Basic': "Basic" }
        ],
        default: "Basic"
    }, {
        name: 'unlockType',
        type: 'number',
        enum: [
            { 'Purchase': 0 },
            { 'Random Unlock': 1 },
            { 'Rewarded': 2 }
        ],
        default: 2
    }, {
        name: 'price',
        type: 'number',
        default: 0
    }, {
        name: 'template',
        type: 'asset',
        assetType: 'template'
    }, {
        name: 'icon',
        type: 'asset',
        assetType: 'sprite'
    }, {
        name: 'iconLocked',
        type: 'asset',
        assetType: 'sprite'
    }],

    array: true
});




ShopManager.getInstance = function () {
    if (!ShopManager._instance) console.error('ShopManager is not initialized yet');
    return ShopManager._instance;
};


ShopManager.prototype.initialize = function () {
    ShopManager._app = this.app;
    if (!ShopManager._instance) {
        ShopManager._instance = this;
    }

    if (GameConfig.getAttribute('debug', 'unlockAllShopItems')) {
        console.error('All the shop items are unlocked');
    }

    this._inShop = false;

    this.shopContent = this.entity.findByName('ShopContent');
    this.shopContent.enabled = false;
    this.shopCharacterContainer = this.shopContent.findByName('ShopCharacter');
    this.shopPetContainer = this.shopContent.findByName('ShopPet');

    this.on('attr:testModelSet', this._debugTryTestSkin, this);
    this.on('attr:fogColor', this._applyShopFog, this);
    this.on('attr:fogStart', this._applyShopFog, this);
    this.on('attr:fogEnd', this._applyShopFog, this);
    this.app.on(EventTypes.SHOP_EQUIP_ITEM, this.equipShopItem, this);
    this.app.on(EventTypes.SHOP_UNEQUIP_ITEM, this.unequipShopItem, this);
    this.app.on(EventTypes.ENTER_SHOP, this.onShopEnter, this);
    this.app.on(EventTypes.QUIT_SHOP, this.onShopQuit, this);
    this.app.on(EventTypes.SAVEDATA_LOADED, this.loadSavedValues, this);
};


ShopManager.prototype.onShopEnter = function () {
    this.shopContent.enabled = true;
    this._inShop = true;
    this.app.fire(EventTypes.SHOP_BUILD_CATEGORIES);
    this._applyShopFog();
    this._playCustomizeMusic();
    this._teleportPlayerToShop();
};

ShopManager.prototype.onShopQuit = function () {
    this.shopContent.enabled = false;
    this._inShop = false;
    this.app.fire(EventTypes.RESTORE_LOCATION_FOG);
    this._teleportPetBackToPlayer();
};


ShopManager.prototype.isShopActive = function () {
    return this._inShop;
}

/** common */
ShopManager.prototype.getCategoryData = function (categoryKey) {
    switch (categoryKey) {
        case Constants.ShopCategory.Models:
            return this.modelsCollection;
        case Constants.ShopCategory.Effects:
            return this.effectsCollection;
        case Constants.ShopCategory.Finishers:
            return this.finishersCollection;
        case Constants.ShopCategory.Pets:
            return this.petsCollection;
    }
};


/** models */
ShopManager.prototype.getDefaultBikiniSetData = function () {
    if (this.testModelSet) {
        const testDataSet = this.modelsCollection.find(x => x.name === this.testModelSet);
        if (testDataSet) {
            console.error(`Using test model "${this.testModelSet}"`);
            return testDataSet;
        } else {
            console.error(`Can not find test model named "${this.testModelSet}"!`)
        }
    }
    return this.modelsCollection.find(x => x.isDefault);
};

ShopManager.prototype.getSavedPlayerSkin = function () {
    return this.modelsCollection.findLast(x => x.defaultState === Constants.ShopItemState.Equipped);
};

ShopManager.prototype.getSavedPlayerEffects = function () {
    return this.effectsCollection.filter(x => x.defaultState === Constants.ShopItemState.Equipped);
};

ShopManager.prototype.getSavedFinisher = function () {
    return this.finishersCollection.findLast(x => x.defaultState === Constants.ShopItemState.Equipped);
};

ShopManager.prototype.getSavedPet = function () {
    return this.petsCollection.findLast(x => x.defaultState === Constants.ShopItemState.Equipped);
};

ShopManager.prototype.getModelSkinData = function (skinName) {
    return this.modelsCollection.find(x => x.name === skinName);
};

ShopManager.prototype.getRandomSkinData = function () {
    return Utils.getRandomItem(this.modelsCollection);
};

ShopManager.prototype._debugTryTestSkin = function () {
    const testDataSet = this.modelsCollection.find(x => x.name === this.testModelSet);
    if (testDataSet) {
        console.error(`Equipping test skin "${this.testModelSet}"...`);
        this.app.fire(EventTypes.EQUIP_PLAYER_MODEL_SKIN, testDataSet);
    }
};

ShopManager.prototype.update = function (dt) {

};

/* handling items */
ShopManager.prototype.equipShopItem = function (categoryKey, tabKey, itemKey, itemData, exclusive) {
    switch (categoryKey) {
        case Constants.ShopCategory.Models:
            this._equipModelSkin(tabKey, itemKey, itemData, exclusive);
            break;
        case Constants.ShopCategory.Effects:
            this._equipEffect(tabKey, itemKey, itemData, exclusive);
            break
        case Constants.ShopCategory.Finishers:
            this._equipFinisher(tabKey, itemKey, itemData, exclusive);
            break
        case Constants.ShopCategory.Pets:
            this._equipPet(tabKey, itemKey, itemData, exclusive);
            break
    }
};

ShopManager.prototype.unequipShopItem = function (categoryKey, tabKey, itemKey, itemData, exclusive) {
    switch (categoryKey) {
        case Constants.ShopCategory.Models:
            this._unequipModelSkin(tabKey, itemKey, itemData, exclusive);
            break;
        case Constants.ShopCategory.Effects:
            this._unequipEffect(tabKey, itemKey, itemData, exclusive);
            break
        case Constants.ShopCategory.Finishers:
            this._unequipFinisher(tabKey, itemKey, itemData, exclusive);
            break
        case Constants.ShopCategory.Pets:
            this._unequipPet(tabKey, itemKey, itemData, exclusive);
            break
    }
};


ShopManager.prototype._equipModelSkin = function (tabKey, itemKey, itemData, exclusive) {
    this.app.fire(EventTypes.EQUIP_PLAYER_MODEL_SKIN, itemData);
    this.app.fire(EventTypes.SHOW_PLAYER_CLOTH_CHANGE_EFFECT);
    LocalStorageController.save(false); // delayed, not immeadiately!
};


ShopManager.prototype._unequipModelSkin = function (tabKey, itemKey, itemData, exclusive) {

};


ShopManager.prototype._equipEffect = function (tabKey, itemKey, itemData, exclusive) {
    this.app.fire(EventTypes.EQUIP_PLAYER_EFFECT, itemData);
    LocalStorageController.save(false);
};

ShopManager.prototype._unequipEffect = function (tabKey, itemKey, itemData, exclusive) {
    this.app.fire(EventTypes.UNEQUIP_PLAYER_EFFECT, itemData);
    LocalStorageController.save(false);
};

ShopManager.prototype._equipFinisher = function (tabKey, itemKey, itemData, exclusive) {
    this.app.fire(EventTypes.EQUIP_FINISHER, itemData);
    LocalStorageController.save(false);
};

ShopManager.prototype._unequipFinisher = function (tabKey, itemKey, itemData, exclusive) {

};

ShopManager.prototype._equipPet = function (tabKey, itemKey, itemData, exclusive) {
    this.app.fire(EventTypes.EQUIP_PET, itemData, true);
    LocalStorageController.save(false);
};

ShopManager.prototype._unequipPet = function (tabKey, itemKey, itemData, exclusive) {
    if (PetController.getInstance().isPetEquipped(itemData.name)) {
        this.app.fire(EventTypes.UNEQUIP_PET, itemData);
        LocalStorageController.save(false);
    }
};

/** save / load */
ShopManager.prototype.getShopSaveData = function () {
    const shopSaveData = {
        models: {},
        effects: {},
        finishers: {},
        pets: {}
    };

    this.modelsCollection.filter(x => x.defaultState !== Constants.ShopItemState.Locked).forEach(x => shopSaveData.models[x.name] = x.defaultState);
    this.effectsCollection.filter(x => x.defaultState !== Constants.ShopItemState.Locked).forEach(x => shopSaveData.effects[x.name] = x.defaultState);
    this.finishersCollection.filter(x => x.defaultState !== Constants.ShopItemState.Locked).forEach(x => shopSaveData.finishers[x.name] = x.defaultState);
    this.petsCollection.filter(x => x.defaultState !== Constants.ShopItemState.Locked).forEach(x => shopSaveData.pets[x.name] = x.defaultState);
    return shopSaveData;
};


ShopManager.prototype.loadSavedValues = function () {
    /* gold bonus */
    if (GameConfig.getAttribute('debug', 'goldBonus') > 0) {
        console.error('Earned extra 💎' + GameConfig.getAttribute('debug', 'goldBonus'));
        DataManager.getInstance().gems = GameConfig.getAttribute('debug', 'goldBonus');
    };

    const shopSaveData = LocalStorageController.getSavedValue(Constants.Storage.SHOP_DATA);
    if (shopSaveData) {
        const { models = {}, effects = {}, finishers = {}, pets = {} } = shopSaveData;
        Object.keys(models).forEach(key => { const record = this.modelsCollection.find(x => x.name === key); if (record) record.defaultState = models[key] });
        Object.keys(effects).forEach(key => { const record = this.effectsCollection.find(x => x.name === key); if (record) record.defaultState = effects[key] });
        Object.keys(finishers).forEach(key => { const record = this.finishersCollection.find(x => x.name === key); if (record) record.defaultState = finishers[key] });
        Object.keys(pets).forEach(key => { const record = this.petsCollection.find(x => x.name === key); if (record) record.defaultState = pets[key] });
    }
}

/** Shop player model **/
ShopManager.prototype._teleportPlayerToShop = function () {
    const player = PlayerController.getInstance().getPlayerCharacter();
    player.setPosition(this.shopCharacterContainer.getPosition());
    player.setLocalEulerAngles(0, 30, 0);

    PetController.getInstance()._syncPositionWithPlayer = false;
    // if (PetController.getInstance().getActivePet()) {
        PetController.getInstance().setPetShopPosition(this.shopPetContainer.getPosition());
    // }
};

ShopManager.prototype._teleportPetBackToPlayer = function () {
    /* automatically resets when exiting to main menu */
    PetController.getInstance()._syncPositionWithPlayer = true;
};

ShopManager.prototype._playCustomizeMusic = function() {
    this.app.fire(EventTypes.PLAY_MUSIC, 'customize');
}

/** Fog in the shop */
ShopManager.prototype._applyShopFog = function () {
    this.app.scene.fog = pc.FOG_LINEAR;
    this.app.scene.fogColor = this.fogColor;
    this.app.scene.fogStart = this.fogStart;
    this.app.scene.fogEnd = this.fogEnd;
};

// TabButton.js
var TabButton = pc.createScript('tabButton');

TabButton.attributes.add('categoryKey', {
    type: 'string'
});

TabButton.attributes.add('tabKey', {
    type: 'string'
});

TabButton.prototype.initialize = function () {
    this.tabButtonsContainer = this.entity.parent;
    this.categoryContainer = this.tabButtonsContainer.parent;
    this.notification = this.entity.findByName('Notification');
    if(!this.notification) Debug.error('No notification icon on shop tab' + this.tabKey);
    this.notification.enabled = false;

    this._selected = false;
    this._defaultWidth = this.entity.element.width;
    this._defaultHeight = this.entity.element.height;
    this._enlargedWidth = Math.floor(this._defaultWidth * 1.25);
    this._enlargedHeight = Math.floor(this._defaultHeight * 1.25);

    this.entity.on(EventTypes.BUTTON_PRESSED, this.onTabClicked, this);
    this.app.on(EventTypes.SHOP_TAB_SELECTED, this.onShopTabSelected, this);
    this.app.on(EventTypes.SHOW_SHOP_TAB_NOTIFICATION_ICON, this.showNotificationIcon, this);
    this.app.on(EventTypes.HIDE_SHOP_TAB_NOTIFICATION_ICON, this.hideNotificationIcon, this);
};


TabButton.prototype.onTabClicked = function () {
    this.app.fire(EventTypes.SHOP_TAB_SELECTED, this.tabKey, this.categoryKey);
};

TabButton.prototype.showNotificationIcon = function(tabKey, categoryKey) {
    if(this.tabKey === tabKey && this.categoryKey === categoryKey) {
        this.notification.enabled = true;
    }
};

TabButton.prototype.hideNotificationIcon = function(tabKey, categoryKey) {
    if(this.tabKey === tabKey && this.categoryKey === categoryKey) {
        this.notification.enabled = false;
    }
};

TabButton.prototype.onShopTabSelected = function (tabKey, categoryKey, instantly = false) {
    if (categoryKey === this.categoryKey) {
        this.setSelected(tabKey === this.tabKey, instantly);
        if(this._selected) this.notification.enabled = false;
    }
}

TabButton.prototype.setSelected = function (value, instantly = false) {
    this._selected = value;
    if (instantly) {
        this.app.stopAllTweens(this.entity);
        this.entity.element.width = value ? this._enlargedWidth  : this._defaultWidth;
        this.entity.element.height = value ? this._enlargedHeight : this._defaultHeight;
    } else {
        this.entity.tween(this.entity.element)
            .to({ width: value ? this._enlargedWidth : this._defaultWidth, height: value ? this._enlargedHeight : this._defaultHeight }, 0.2, pc.SineOut)
            .start();
    }
}

TabButton.prototype.update = function (dt) {

};



// ShopCategory.js
var ShopCategory = pc.createScript('shopCategory');

ShopCategory.attributes.add('categoryKey', {
    type: 'string'
});

ShopCategory.prototype.initialize = function() {
    this.tabButtonsContainer = this.entity.findByName('TabButtons');
    this.tabsContainer = this.entity.findByName('TabsContainer');

    this._activeTabKey = null;
    this._activeTab = null;
    this.tabs = new Map();
    this.tabsContainer.children.forEach(x => {
        x.enabled = true;
        this.tabs.set(x.name.replace('Tab', ''), x);
    });

    this.entity.show = this.show.bind(this);
    this.entity.hide = this.hide.bind(this);
    this.entity.switchToTab = this.switchToTab.bind(this);

    this.app.once(EventTypes.SHOP_BUILD_CATEGORIES, this.buildTabs, this);
};

ShopCategory.prototype.postInitialize = function() {
    // this.buildTabs();

    /* disable after initialization */
    // this.hide();
}

ShopCategory.prototype.buildTabs = function() {
    const categoryData = ShopManager.getInstance().getCategoryData(this.categoryKey);
    this.tabs.forEach((tab, tabKey) => {
        const tabItemsDatas = categoryData.filter(x => x.tab === tabKey);
        tab.buildItems(tabItemsDatas, this.categoryKey);
    });
};

ShopCategory.prototype.show = function(instantly = false) {
    this.entity.enabled = true;
    this.app.fire(EventTypes.SHOP_TAB_SELECTED, this._activeTabKey || Constants.ShopTab.Basic, this.categoryKey, instantly);
};

ShopCategory.prototype.hide = function() {
    this.entity.enabled = false;
};

ShopCategory.prototype.switchToTab = function(tabKey, categoryKey, instantly = false) {
    this._activeTabKey = tabKey;
    this._activeTab = this.tabs.get(tabKey);
    this.tabs.forEach(x => (x === this._activeTab) ? x.show(instantly) : x.hide());
}


ShopCategory.prototype.update = function(dt) {

};


// CategoryButton.js
var CategoryButton = pc.createScript('categoryButton');

CategoryButton.attributes.add('categoryKey', {
    type: 'string'
});

CategoryButton.prototype.initialize = function () {
    this.notification = this.entity.findByName('Notification');
    if (!this.notification) Debug.error('No notification icon on shop category ' + this.categoryKey);
    this.notification.enabled = false;

    this.notificationTabStatuses = new Map();

    this._selected = false;
    this._defaultWidth = this.entity.element.width;
    this._defaultHeight = this.entity.element.height;
    this._enlargedWidth = Math.floor(this._defaultWidth * 1.3);
    this._enlargedHeight = this._defaultHeight;


    this.entity.on(EventTypes.BUTTON_PRESSED, this.onCategorySelected, this);
    this.app.on(EventTypes.SHOP_CATEGORY_SELECTED, this.handleCategoryButtonPressed, this);
    this.app.on(EventTypes.SHOW_SHOP_TAB_NOTIFICATION_ICON, this.showNotificationIcon, this);
    this.app.on(EventTypes.HIDE_SHOP_TAB_NOTIFICATION_ICON, this.hideNotificationIcon, this);
};



CategoryButton.prototype.showNotificationIcon = function (tabKey, categoryKey) {
    if (this.categoryKey === categoryKey) {
        this.notificationTabStatuses.set(tabKey, true);
        this._updateNotificationVisibility();
    }
};

CategoryButton.prototype.hideNotificationIcon = function (tabKey, categoryKey) {
    if (this.categoryKey === categoryKey) {
        this.notificationTabStatuses.set(tabKey, false);
        this._updateNotificationVisibility();
    }
};

CategoryButton.prototype._updateNotificationVisibility = function () {
    let notifEnabled = false;
    this.notificationTabStatuses.forEach(x => {
        if (x) notifEnabled = true;
    })
    this.notification.enabled = notifEnabled;
};

CategoryButton.prototype.onCategorySelected = function () {
    this.app.fire(EventTypes.SHOP_CATEGORY_SELECTED, this.categoryKey);
    this.notification.enabled = false;
};

CategoryButton.prototype.handleCategoryButtonPressed = function (categoryKey) {
    this.setSelected(categoryKey === this.categoryKey);
}

CategoryButton.prototype.setSelected = function (value) {
    this._selected = value;
    this.entity.tween(this.entity.element)
        .to({ width: value ? this._enlargedWidth : this._defaultWidth, height: value ? this._enlargedHeight : this._defaultHeight }, 0.2, pc.SineOut)
        .start();
}

CategoryButton.prototype.update = function (dt) {

};



// ShopTab.js
var ShopTab = pc.createScript('shopTab');

ShopTab.attributes.add('tabKey', {
    type: 'string'
});

ShopTab.attributes.add('itemTemplate', {
    type: 'asset',
    assetType: 'template'
});


ShopTab.prototype.initialize = function () {
    this.playMoreReminder = this.entity.findByName('PlayMoreReminder');
    this.itemsContainer = this.entity.findByName('Items');
    this.items = [];
    this.categoryKey = null;

    this.entity.tabKey = this.tabKey;
    this.entity.show = this.show.bind(this);
    this.entity.hide = this.hide.bind(this);
    this.entity.buildItems = this.buildItems.bind(this);
    this.entity.getItems = () => this.items;
    this.entity.getLockedItems = () => this.items.filter(x => x.getItemState() === Constants.ShopItemState.Locked);
    this.entity.getUnlockedItems = () => this.items.filter(x => x.getItemState() !== Constants.ShopItemState.Locked);
    this.entity.getOwnedItems = () => this.items.filter(x => x.getItemState() === Constants.ShopItemState.Owned);
    this.entity.getEquippedItems = () => this.items.filter(x => x.getItemState() === Constants.ShopItemState.Equipped);

    this.app.on(EventTypes.SHOP_EQUIP_ITEM, this.onShopItemEquipped, this);
    this.app.on(EventTypes.GEMS_AMOUNT_CHANGED, this.onGemsAmountChanged, this);

};


ShopTab.prototype.postInitialize = function () {
    /* disable after initialization */
    // this.hide();
};

ShopTab.prototype.onGemsAmountChanged = function (gems, prevGemsValue) {
    if(!this._built) return;

    const increased = gems > prevGemsValue;
    const availableItems = this.findAvailableForPurchaseItems();

    if(increased && availableItems.length > 0) {
        this.app.fire(EventTypes.SHOW_SHOP_TAB_NOTIFICATION_ICON, this.tabKey, this.categoryKey);
    } else if(!increased && availableItems.length === 0){
        this.app.fire(EventTypes.HIDE_SHOP_TAB_NOTIFICATION_ICON, this.tabKey, this.categoryKey);
    }
};

ShopTab.prototype.findAvailableForPurchaseItems = function() {
    let availableItems = [];
    for(let item of this.items) {
        if(item.canBePurchased()) {
            availableItems.push(item);
        }
    }
    return availableItems;
};


ShopTab.prototype.buildItems = function (itemsDatas, categoryKey) {
    this.categoryKey = this.entity.categoryKey = categoryKey;
    if (!itemsDatas || itemsDatas.length === 0) return console.error('no items for tab ' + this.entity.path);
    if (!this.itemTemplate) return console.error('no item template set on ' + this.entity.path);
    for (let data of itemsDatas) {
        const item = this.itemTemplate.resource.instantiate();
        this.itemsContainer.addChild(item);
        item.init(data, this.tabKey, this.categoryKey);
        this.items.push(item);
    }
    this._built = true;
};

ShopTab.prototype.onShopItemEquipped = function (categoryKey, tabKey, itemKey, itemData, exclusive) {
    if (categoryKey === this.categoryKey) {
        if (exclusive) {
            this.items.forEach(item => {
                if (item.itemKey === itemKey) {
                    item.setSelected(true);
                } else {// if (item.isEquipped()) {
                    item.unequip();
                }
            });
        } else {
            this.items.filter(item => item.itemKey === itemKey).forEach(item => item.setSelected(true));
        }
    }
};

ShopTab.prototype.show = function (instantly = false) {
    this.entity.enabled = true;
    if(this.playMoreReminder) {
        this.playMoreReminder.enabled = this.items.some(item => item.getItemState() === Constants.ShopItemState.Locked);
    }
};

ShopTab.prototype.hide = function () {
    this.entity.enabled = false;
};

ShopTab.prototype.update = function (dt) {

};


// RewardedClaimButton.js
var RewardedClaimButton = pc.createScript('rewardedClaimButton');

RewardedClaimButton.prototype.initialize = function () {
    this.rewardedGroup = this.entity.findByName('RewardedGroup');
    this.rewardedGreyed = this.rewardedGroup.findByName('Greyed');
    this.rewardedActiveButton = this.rewardedGroup.findByName('Active');

    this.purchaseGroup = this.entity.findByName('PurchaseGroup');
    this.purchaseGreyed = this.purchaseGroup.findByName('Greyed');
    this.purchaseActiveButton = this.purchaseGroup.findByName('Active');
    this.purchaseText = this.purchaseActiveButton.findByName('PriceText');
    this.purchaseTextGreyed = this.purchaseGreyed.findByName('PriceText');

    this._price = 0;

    if (APIMediator.areRewardedAdsSupported()) {
        this.rewardedGroup.enabled = true;
        this.purchaseGroup.enabled = false;//
    } else {
        this.rewardedGroup.enabled = false;
        this.purchaseGroup.enabled = true;
    }

    this.entity.init = this.init.bind(this);

    this.rewardedActiveButton.on(EventTypes.BUTTON_PRESSED, this.onRewardedButtonPressed, this);
    this.purchaseActiveButton.on(EventTypes.BUTTON_PRESSED, this.onPurchasePressed, this);
};

RewardedClaimButton.prototype.init = function (data) {
    this._price = data.price;
    this.purchaseText.element.text = `${this._price}`;
    this.purchaseTextGreyed.element.text = `${this._price}`;
};


RewardedClaimButton.prototype.update = function (dt) {
    if (APIMediator.areRewardedAdsSupported()) {
        if (!this._videoIsBeingWatched) {
            if (APIMediator.isRewardedAdAvailable('button:shop:unlockItem')) {
                this.rewardedActiveButton.enabled = true;
                this.rewardedGreyed.enabled = false;
            } else {
                this.rewardedActiveButton.enabled = false;
                this.rewardedGreyed.enabled = true;
            }
        }
    } else {
        this.purchaseActiveButton.enabled = DataManager.getInstance().gems >= this._price;
        this.purchaseGreyed.enabled = !this.purchaseActiveButton.enabled;
    }
};



RewardedClaimButton.prototype.onPurchasePressed = function (dt) {
    Debug.error('Purchase for 💎' + this._price);
    if (DataManager.getInstance().gems >= this._price) {
        DataManager.getInstance().gems -= this._price;
        this.entity.parent.fire(EventTypes.ShopItem.EARNED_VIA_BUTTON);
    }
};

RewardedClaimButton.prototype.onRewardedButtonPressed = async function (dt) {
    this._videoIsBeingWatched = true;
    this.rewardedActiveButton.setAvailable(false);

    Debug.error('Watching rewarded video ✨');

    const result = await APIMediator.watchRewardedVideo('button:shop:unlockItem');
    if (result) {
        this.entity.parent.fire(EventTypes.ShopItem.EARNED_VIA_BUTTON);
    } else {
        this.rewardedActiveButton.setAvailable(true);
    }
    this._videoIsBeingWatched = false;
};



// ShopItemRandomUnlock.js
var ShopItemRandomUnlock = pc.createScript('shopItemRandomUnlock');

ShopItemRandomUnlock.prototype.initialize = function() {

};


ShopItemRandomUnlock.prototype.update = function(dt) {

};



// ShopItem.js
var ShopItem = pc.createScript('shopItem');

ShopItem.attributes.add('exclusive', {
    type: 'boolean',
    default: true,
    description: 'Replace all others in category when onabled'
});

ShopItem.attributes.add('detachable', {
    type: 'boolean',
    default: false,
    description: 'Can this item be deteached from the model?'
});

ShopItem.prototype.initialize = function () {
    this.icon = this.entity.findByName('Icon');
    this.iconLocked = this.entity.findByName('IconLocked');
    this.selectFrame = this.entity.findByName('SelectFrame');
    this.randomizeFrame = this.entity.findByName('RandomizeFrame');

    this.entity.itemKey = null;
    this.entity.itemShopData = null;
    this.entity.tabKey = null;
    this.entity.categoryKey = null;

    this.icon.element.useInput = true;
    this.icon.on(EventTypes.BUTTON_PRESSED, this.onIconPressed, this);

    this.entity.init = this.init.bind(this);
    this.entity.equip = this.equip.bind(this);
    this.entity.unequip = this.unequip.bind(this);
    this.entity.setSelected = this.setSelected.bind(this);
    this.entity.isEquipped = this.isEquipped.bind(this);
    this.entity.setLocked = this.setLocked.bind(this);
    this.entity.getItemState = this.getItemState.bind(this);
    this.entity.setItemState = this.setItemState.bind(this);
    this.entity.canBePurchased = this.canBePurchased.bind(this);
    this.entity.setRandomizeFrameVisible = this.setRandomizeFrameVisible.bind(this);

    this.entity.on(EventTypes.ShopItem.EARNED_VIA_BUTTON, this.handleItemEarned, this);
};

ShopItem.prototype.init = function (data, tabKey, categoryKey) {
    this.entity.tabKey = tabKey;
    this.entity.categoryKey = categoryKey;
    this.entity.itemShopData = data;

    const { name, icon, template } = data;
    this.entity.itemKey = name;
    this.icon.element.spriteAsset = data.icon.id;

    if(data.iconLocked && this.iconLocked) this.iconLocked.element.spriteAsset = data.iconLocked.id;

    this.setItemState(data.defaultState);

    this.entity.fire(EventTypes.ShopItem.INIT_BUTTONS, data);

    if (GameConfig.getAttribute('debug', 'unlockAllShopItems')) {
        this.setLocked(false);
    }   
};

ShopItem.prototype.handleItemEarned = function() {
    this.equip();
}

ShopItem.prototype.getItemState = function () {
    return this.entity.itemShopData.defaultState;
};

ShopItem.prototype.setRandomizeFrameVisible = function (value) {
    if (this.randomizeFrame) this.randomizeFrame.enabled = value;
};

ShopItem.prototype.setItemState = function (itemState) {
    this.entity.itemShopData.defaultState = itemState;
    this.icon.element.useInput = this.getItemState() !== Constants.ShopItemState.Locked;
    this.setLocked(this.getItemState() === Constants.ShopItemState.Locked);
    this.setSelected(this.getItemState() === Constants.ShopItemState.Equipped);
    this.entity.fire(EventTypes.ShopItem.STATE_CHANGED, this.getItemState());
};

ShopItem.prototype.setLocked = function (locked) {
    this.icon.enabled = true; //!locked;
    this.iconLocked.enabled = locked;
};

ShopItem.prototype.setSelected = function (selected) {
    this._selected = selected;
    this.selectFrame.enabled = selected;
};

ShopItem.prototype.isEquipped = function () {
    return this.getItemState() === Constants.ShopItemState.Equipped;
};

ShopItem.prototype.canBePurchased = function () {
    if(this.getItemState() !== Constants.ShopItemState.Locked) return false;
    if(this.entity.itemShopData) {
        const priceCheck = this.entity.itemShopData.price > 0 && this.entity.itemShopData.price <= DataManager.getInstance().gems;
        const levelCheck = this.entity.itemShopData.requiredLevel ? (DataManager.getInstance().level >= this.entity.itemShopData.requiredLevel) : true;
        if(this.entity.itemShopData.unlockType === Constants.ShopItemUnlockType.Rewarded && (APIMediator.isRewardedVideoPresentAtTheMoment() || priceCheck)) return true; 
        if(this.entity.itemShopData.unlockType === Constants.ShopItemUnlockType.Purchase && priceCheck && levelCheck) return true;
    } 
    return false;
};


ShopItem.prototype.equip = function () {
    this.setItemState(Constants.ShopItemState.Equipped);
    this.app.fire(EventTypes.SHOP_EQUIP_ITEM, this.entity.categoryKey, this.entity.tabKey, this.entity.itemKey, this.entity.itemShopData, this.exclusive);
};

ShopItem.prototype.unequip = function (saveState = true) {
    if(saveState && this.getItemState() === Constants.ShopItemState.Equipped) this.setItemState(Constants.ShopItemState.Owned);
    this.setSelected(false);
    this.app.fire(EventTypes.SHOP_UNEQUIP_ITEM, this.entity.categoryKey, this.entity.tabKey, this.entity.itemKey, this.entity.itemShopData, this.exclusive);
};


ShopItem.prototype.onIconPressed = function () {
    if(this.getItemState() === Constants.ShopItemState.Locked) return;
    if (this.detachable && this._selected) {
        this.unequip();
    } else {
        this.equip();
    }
}

ShopItem.prototype.update = function (dt) {

};



// ShopItemRewarded.js
var ShopItemRewarded = pc.createScript('shopItemRewarded');

ShopItemRewarded.prototype.initialize = function () {
    this.buttonRewardedClaim = this.entity.findByName('ButtonRewardedClaim');

    this.entity.on(EventTypes.ShopItem.STATE_CHANGED, this.handleItemStateChanged, this);
    this.entity.on(EventTypes.ShopItem.INIT_BUTTONS, this._initButtons, this);
};

ShopItemRewarded.prototype._initButtons = function(data) {
    this.buttonRewardedClaim.init(data);
};

ShopItemRewarded.prototype.handleItemStateChanged = function(itemState) {
    this.buttonRewardedClaim.enabled = itemState === Constants.ShopItemState.Locked;
};

ShopItemRewarded.prototype.update = function (dt) {

};


// PurchaseButton.js
var PurchaseButton = pc.createScript('purchaseButton');

PurchaseButton.prototype.initialize = function () {
    this.purchaseGreyed = this.entity.findByName('Greyed');
    this.purchaseActiveButton = this.entity.findByName('Active');
    this.purchaseText = this.purchaseActiveButton.findByName('PriceText');
    this.purchaseTextGreyed = this.purchaseGreyed.findByName('PriceText');

    this._price = 0;

    this.entity.init = this.init.bind(this);

    this.purchaseActiveButton.on(EventTypes.BUTTON_PRESSED, this.onPurchasePressed, this);
};

PurchaseButton.prototype.init = function (data) {
    this._price = data.price;
    this.purchaseText.element.text = `${this._price}`;
    this.purchaseTextGreyed.element.text = `${this._price}`;
};

PurchaseButton.prototype.update = function (dt) {
    this.purchaseActiveButton.enabled = DataManager.getInstance().gems >= this._price;
    this.purchaseGreyed.enabled = !this.purchaseActiveButton.enabled;
};

PurchaseButton.prototype.onPurchasePressed = function (dt) {
    Debug.warn('Purchase for 💎' + this._price);
    if (DataManager.getInstance().gems >= this._price) {
        DataManager.getInstance().gems -= this._price;
        this.entity.parent.fire(EventTypes.ShopItem.EARNED_VIA_BUTTON);
    }
};

// ShopItemPurchaseable.js
var ShopItemPurchaseable = pc.createScript('shopItemPurchaseable');

ShopItemPurchaseable.prototype.initialize = function () {
    this.buttonPurchase = this.entity.findByName('ButtonPurchase');

    this.entity.on(EventTypes.ShopItem.STATE_CHANGED, this.handleItemStateChanged, this);
    this.entity.on(EventTypes.ShopItem.INIT_BUTTONS, this._initButtons, this);

    this.app.on(EventTypes.LEVEL_CHANGED, this.handleLevelChange, this);
};

ShopItemPurchaseable.prototype._initButtons = function (data) {
    this.buttonPurchase.init(data);
};

ShopItemPurchaseable.prototype.handleLevelChange = function () {
    if (this.entity.itemShopData.requiredLevel) {
        this.handleItemStateChanged(this.entity.getItemState());
    }
};

ShopItemPurchaseable.prototype.handleItemStateChanged = function (itemState) {
    const levelCheck = this.entity.itemShopData.requiredLevel ? (DataManager.getInstance().level >= this.entity.itemShopData.requiredLevel) : true;
    this.buttonPurchase.enabled = levelCheck && itemState === Constants.ShopItemState.Locked;
};

ShopItemPurchaseable.prototype.update = function (dt) {

};


// ScrollViewAutoHeight.js
var ScrollViewAutoHeight = pc.createScript('scrollViewAutoHeight');

ScrollViewAutoHeight.prototype.initialize = function () {
    this.app.on(EventTypes.Screen.RESIZED, this.onScreenResized, this);
    this.app.on(EventTypes.SHOP_TAB_SELECTED, this.onScreenResized, this);
};

ScrollViewAutoHeight.prototype.postInitialize = function () {
    this.onScreenResized();
};

ScrollViewAutoHeight.prototype.onScreenResized = function () {
    Utils.wait(0).then(() => {
        if (this.entity.children.length === 0) return;
        const spacingX = this.entity.layoutgroup.spacing.x;
        const spacingY = this.entity.layoutgroup.spacing.y;
        const cellWidth = this.entity.children[0].element.width + spacingX;
        const cellHeight = this.entity.children[0].element.height + spacingY;

        const numCols = Math.floor(this.entity.element.width / cellWidth);
        const numRows = Math.max(1, Math.ceil(this.entity.children.length / numCols));
        this.entity.element.height = numRows * cellHeight;
    });
};



ScrollViewAutoHeight.prototype.update = function (dt) {

};



// fly-camera.js
var FlyCamera = pc.createScript('flyCamera');

FlyCamera.attributes.add('speed', {
    type: 'number',
    default: 10
});

FlyCamera.attributes.add('fastSpeed', {
    type: 'number',
    default: 20
});

FlyCamera.attributes.add('mode', {
    type: 'number',
    default: 0,
    enum: [{
        "Lock": 0
    }, {
        "Drag": 1
    }]
});

FlyCamera.attributes.add('ignoreTimeScale', {
    type: 'boolean',
    default: true
});

FlyCamera.prototype.initialize = function () {
    // Camera euler angle rotation around x and y axes
    var eulers = this.entity.getLocalEulerAngles();
    this.ex = eulers.x;
    this.ey = eulers.y;
    this.moved = false;
    this.lmbDown = false;

    // Disabling the context menu stops the browser displaying a menu when
    // you right-click the page
    this.app.mouse.disableContextMenu();
    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
};

FlyCamera.prototype.update = function (dt) {
    if(this.ignoreTimeScale && this.app.timeScale !== 0) {
        dt = dt / this.app.timeScale;
    }
    // Update the camera's orientation
    this.entity.setLocalEulerAngles(this.ex, this.ey, 0);

    var app = this.app;

    var speed = this.speed;
    if (app.keyboard.isPressed(pc.KEY_SHIFT)) {
        speed = this.fastSpeed;
    }

    // Update the camera's position
    if (app.keyboard.isPressed(pc.KEY_UP) || app.keyboard.isPressed(pc.KEY_W)) {
        this.entity.translateLocal(0, 0, -speed * dt);
    } else if (app.keyboard.isPressed(pc.KEY_DOWN) || app.keyboard.isPressed(pc.KEY_S)) {
        this.entity.translateLocal(0, 0, speed * dt);
    }

    if (app.keyboard.isPressed(pc.KEY_LEFT) || app.keyboard.isPressed(pc.KEY_A)) {
        this.entity.translateLocal(-speed * dt, 0, 0);
    } else if (app.keyboard.isPressed(pc.KEY_RIGHT) || app.keyboard.isPressed(pc.KEY_D)) {
        this.entity.translateLocal(speed * dt, 0, 0);
    }
};

FlyCamera.prototype.onMouseMove = function (event) {
    if(!this.entity.enabled) return;
    if (!this.mode) {
        if (!pc.Mouse.isPointerLocked())
            return;
    } else {
        if (!this.lmbDown)
            return;
    }


    // Update the current Euler angles, clamp the pitch.
    if (!this.moved) {
        // first move event can be very large
        this.moved = true;
        return;
    }
    this.ex -= event.dy / 5;
    this.ex = pc.math.clamp(this.ex, -90, 90);
    this.ey -= event.dx / 5;
};

FlyCamera.prototype.onMouseDown = function (event) {
    if(!this.entity.enabled) return;

    if (event.button === 0) {
        this.lmbDown = true;

        // When the mouse button is clicked try and capture the pointer
        if (!this.mode && !pc.Mouse.isPointerLocked()) {
            this.app.mouse.enablePointerLock();
        }
    }
};

FlyCamera.prototype.onMouseUp = function (event) {
    if(!this.entity.enabled) return;

    if (event.button === 0) {
        this.lmbDown = false;
    }
};


// languageDropdownMenu.js
var LanguageDropdownMenu = pc.createScript('languageDropdownMenu');

LanguageDropdownMenu.prototype.initialize = function () {
    this.overlay = this.entity.findByName('ClickableOverlay');
    this.languagesGroup = this.entity.findByName('LanguagesGroup');
    this.languageButtons = this.languagesGroup.children;

    this.languageButtons.forEach(button => {
        BasicButton.assignAction(button, () => this.onLanguageButtonClicked(button));
    });

    BasicButton.assignAction(this.overlay, this.close, this);
    this.app.on('app:changeLocale', this._onAppLocaleChanged, this);
};

LanguageDropdownMenu.prototype.postInitialize = function () {
    let scrollAreaHeight = 0;
    this.languageButtons.forEach(button => {
        button.enabled = this.app.i18n._translations.hasOwnProperty(button.getLanguageCode());
        scrollAreaHeight += button.enabled ? 72 : 0;
    });

    this.languagesGroup.element.height = scrollAreaHeight;
    this.entity.enabled = false;
};

LanguageDropdownMenu.prototype.onLanguageButtonClicked = async function (button) {
    this.onLanguageSelected(button);
    this.close();

    const languageCode = button.getLanguageCode();
    LocalizationManager.getInstance().changeLocale(languageCode);
    LocalStorageController.save();
};

LanguageDropdownMenu.prototype.onLanguageSelected = function (button) {
    this.languageButtons.forEach(_btn => {
        _btn.setSelected(_btn === button);
    });
    this.app.fire(EventTypes.LANGUAGE_SELECTED, button.getLanguageCode(), button.getDisplayName());
};


LanguageDropdownMenu.prototype._onAppLocaleChanged = function (localeCode) {
    const closestLocale = this.app.i18n.findAvailableLocale(localeCode);
    const languageButton = this.languageButtons.find(button => button.getLanguageCode() === closestLocale);
    if (languageButton) {
        this.onLanguageSelected(languageButton);
    }
};


LanguageDropdownMenu.prototype.close = function () {
    this.entity.enabled = false;
};

LanguageDropdownMenu.prototype.update = function (dt) {

};

// languageSelectorItem.js
var LanguageSelectorItem = pc.createScript('languageSelectorItem');

LanguageSelectorItem.attributes.add('languageCode', {
    type: 'string',
    default: ""
});

LanguageSelectorItem.attributes.add('displayName', {
    type: 'string',
    default: ""
});


LanguageSelectorItem.prototype.initialize = function() {
    if(!this.languageCode) return console.error('Language code is not set for item ' + this.entity.path);
    this.checkbox = this.entity.findByName('Selected');

    this.entity.element.text = this.displayName;

    this.entity.getLanguageCode = () => this.languageCode;
    this.entity.getDisplayName = () => this.displayName;
    this.entity.isSelected = () => this.checkbox.enabled;
    this.entity.setSelected = (value) => this.checkbox.enabled = value;
};


LanguageSelectorItem.prototype.update = function(dt) {

};

// ShopTabRandomUnlock.js
var ShopTabRandomUnlock = pc.createScript('shopTabRandomUnlock');

ShopTabRandomUnlock.prototype.initialize = function () {
    this.buttonRandomUnlock = this.entity.findByName('ButtonUnlockRandom');
    if (!this.buttonRandomUnlock) console.error('No random unlock button on tab ' + this.entity.name);

    this.buttonRandomUnlock.on(EventTypes.BUTTON_PRESSED, this.onRandomUnlockPressed, this);

    this.app.once(EventTypes.SHOP_BUILD_CATEGORIES, this.build, this);
};

ShopTabRandomUnlock.prototype.postInitialize = function () {

};

ShopTabRandomUnlock.prototype.build = function () {
    this.getCurrentItemPrice();

    this.app.on(EventTypes.GEMS_AMOUNT_CHANGED, this.updateView, this);
    this.updateView();
};


ShopTabRandomUnlock.prototype.updateView = function () {
    const totalItems = this.entity.getItems().length;
    const lockedItems = this.entity.getLockedItems().length;
    const unlockedItems = totalItems - lockedItems;

    if (lockedItems === 0) {
        this.buttonRandomUnlock.enabled = false;
    } else {
        this.buttonRandomUnlock.enabled = true;
        this.updateRandomUnlockButton();
    }
};

ShopTabRandomUnlock.prototype.getCurrentItemPrice = function () {
    const totalItems = this.entity.getItems().length;
    const lockedItems = this.entity.getLockedItems().length;
    const unlockedItems = totalItems - lockedItems;
    const basePrice = GameConfig.getAttribute('shop', `basePrice${this.entity.categoryKey}${this.entity.tabKey}`);
    const priceIncrement = GameConfig.getAttribute('shop', `priceIncrement${this.entity.categoryKey}${this.entity.tabKey}`);
    return basePrice + unlockedItems * priceIncrement;
};

ShopTabRandomUnlock.prototype.updateRandomUnlockButton = function () {
    const gems = DataManager.getInstance().gems;
    const itemPrice = this.getCurrentItemPrice();
    this.buttonRandomUnlock.setPurchasePrice(itemPrice);
    const hasEnoughMoney = gems >= itemPrice;
    this.buttonRandomUnlock.setPurchaseAvailable(hasEnoughMoney);
    if (hasEnoughMoney) {
        this.app.fire(EventTypes.SHOW_SHOP_TAB_NOTIFICATION_ICON, this.entity.tabKey, this.entity.categoryKey);
    } else {
        this.app.fire(EventTypes.HIDE_SHOP_TAB_NOTIFICATION_ICON, this.entity.tabKey, this.entity.categoryKey);
    }
};

ShopTabRandomUnlock.prototype.onRandomUnlockPressed = async function () {
    const gems = DataManager.getInstance().gems;
    const itemPrice = this.getCurrentItemPrice();
    if (gems < itemPrice) return;

    this.buttonRandomUnlock.setAvailable(false);
    const randomItem = await this._playRandomSelectAnimation();

    if (!randomItem) return;

    DataManager.getInstance().gems -= itemPrice;
    randomItem.setItemState(Constants.ShopItemState.Equipped);
    randomItem.equip();
    LocalStorageController.save();

    this.updateView();
};

ShopTabRandomUnlock.prototype._playRandomSelectAnimation = async function () {
    const lockedItems = this.entity.getLockedItems();
    if (lockedItems.length === 0) return null;
    if (lockedItems.length === 1) return lockedItems[0];

    let randomItem = null;
    let numJumps = 11;
    let jumpDuration = 0.075;
    const jumpDurationIncrease = 0.025;
    while (--numJumps > 0) {
        randomItem = Utils.getRandomItemBut(lockedItems, randomItem);
        jumpDuration += jumpDurationIncrease;
        this._highlightSelectedItem(randomItem);
        await Utils.wait(jumpDuration * 1000);
    }
    this._highlightSelectedItem(null); //deselect
    return randomItem;
};

ShopTabRandomUnlock.prototype._highlightSelectedItem = function (item) {
    this.entity.getItems().forEach(x => x.setRandomizeFrameVisible(x === item));
};


ShopTabRandomUnlock.prototype.update = function (dt) {

};



// ButtonRandomUnlock.js
var ButtonRandomUnlock = pc.createScript('buttonRandomUnlock');

ButtonRandomUnlock.prototype.initialize = function() {
    this.active = this.entity.findByName('Active');
    this.greyed = this.entity.findByName('Greyed');
    this.priceText = this.entity.findByName('PriceText');

    this.entity.setPurchaseAvailable = this.setPurchaseAvailable.bind(this);
    this.entity.setPurchasePrice = this.setPurchasePrice.bind(this);
};


ButtonRandomUnlock.prototype.setPurchasePrice = function(value) {
    this.priceText.element.text = `${value}`;
};


ButtonRandomUnlock.prototype.setPurchaseAvailable = function(value) {
    this.entity.setAvailable(value);
    this.active.enabled = value;
    this.greyed.enabled = !value;
};


ButtonRandomUnlock.prototype.update = function(dt) {

};


// EffectIconLocalized.js
var EffectIconLocalized = pc.createScript('effectIconLocalized');


EffectIconLocalized.prototype.initialize = function() {
    this.nameText = this.entity.findByName('Name');
};

EffectIconLocalized.prototype.postInitialize = function() {
    
};


EffectIconLocalized.prototype.update = function(dt) {
    if(!this._nameSet) {
        if(this.entity.itemShopData) {
            this.nameText.element.key = this.entity.itemShopData.effectNameKey;
            this._nameSet = true;
        }
    }
};



// FinisherIconLocalized.js
var FinisherIconLocalized = pc.createScript('finisherIconLocalized');

FinisherIconLocalized.prototype.initialize = function () {
    this.nameText = this.entity.findByName('Name');
};

FinisherIconLocalized.prototype.postInitialize = function () {
};

FinisherIconLocalized.prototype.update = function (dt) {
    if (!this._nameSet) {
        if (this.entity.itemShopData) {
            this.nameText.element.key = this.entity.itemShopData.finisherNameKey;
            this._nameSet = true;
        }
    }
};


// Debug.js
class Debug {
    static log(...args) {
        if(!GameConfig.getAttribute('debug', 'consoleMessages')) return;
        APIMediator.log(...args);
    }

    static warn(...args) {
        if(!GameConfig.getAttribute('debug', 'consoleMessages')) return;
        console.warn(...args);
    }

    static error(...args) {
        if(!GameConfig.getAttribute('debug', 'consoleMessages')) return;
        console.error(...args);
    }
}

// CharacterEffects.js
var CharacterEffects = pc.createScript('characterEffects');


CharacterEffects.prototype.initialize = function () {
    this.armatureBone = this.entity.findByName('Armature');
    this.toeRightEnd = this.armatureBone.findByName('toe_R');
    this.toeLeftEnd = this.armatureBone.findByName('toe_L');

    this.effectsContainer = this.entity.findByName('Effects');
    this.effectsMap = new Map();

    if (this.entity.isPlayer()) {
        /* anim events */
        this.entity.anim.on('step', this._dispatchStep, this);

        this.app.on(EventTypes.EQUIP_PLAYER_EFFECT, this._equipEffect, this);
        this.app.on(EventTypes.UNEQUIP_PLAYER_EFFECT, this._unequipEffect, this);
        this.app.on(EventTypes.SAVEDATA_LOADED, this.onSaveDataLoaded, this);
    }
};

CharacterEffects.prototype.postInitialize = function () {

};

CharacterEffects.prototype.onSaveDataLoaded = function () {
    if (this.entity.isPlayer()) {
        this._loadSavedEffects();
    }
}

CharacterEffects.prototype.update = function (dt) {

};

CharacterEffects.prototype._loadSavedEffects = function () {
    const effectsList = ShopManager.getInstance().getSavedPlayerEffects();
    effectsList.forEach(effect => {
        this._equipEffect(effect);
    });
}

CharacterEffects.prototype._equipEffect = async function (itemData) {
    switch (itemData.name) {
        case 'tattoo_art':
            await this._setEffectVisible(itemData, true);
            break;
        case 'star_walk':
            await this._setEffectVisible(itemData, true);
            break;
        case 'diamond_sparkles':
            await this._setEffectVisible(itemData, true);
            break;
        case 'star_aura':
            await this._setEffectVisible(itemData, true);
            break;
    }
};

CharacterEffects.prototype._unequipEffect = function (itemData) {
    switch (itemData.name) {
        case 'tattoo_art':
            this._setEffectVisible(itemData, false);
            break;
        case 'star_walk':
            this._setEffectVisible(itemData, false);
            break;
        case 'diamond_sparkles':
            this._setEffectVisible(itemData, false);
            break;
        case 'star_aura':
            this._setEffectVisible(itemData, false);
            break;
    }
};

CharacterEffects.prototype._preloadEffectIfNeeded = async function (effectData) {
    const effectName = `effect_${effectData.name}`;
    const effect = this.effectsMap.get(effectName);
    if (!effect) {
        await AssetsLoader.getInstance().loadByTag(effectName);

        const instance = effectData.template.resource.instantiate();
        this.effectsContainer.addChild(instance);
        this.effectsMap.set(effectName, instance);

        /* set root bone */
        this.entity._addArmatureRecursive(instance, this.armatureBone);
    }
}

CharacterEffects.prototype._setEffectVisible = async function (itemData, value) {
    const effectName = `effect_${itemData.name}`;
    let effectEntity = this.effectsMap.get(effectName);
    if (!effectEntity && value) {
        await this._preloadEffectIfNeeded(itemData);
    }

    if (effectEntity) {
        effectEntity.enabled = value;
    }
};

/* animation events */
CharacterEffects.prototype._dispatchStep = function (event) {
    if (this.entity.anim.speed < 0.7) return;

    const starWalkEffect = this.effectsMap.get('effect_star_walk');
    if (starWalkEffect) {
        const worldPosition = event.string === 'left' ? this.toeLeftEnd.getPosition() : this.toeRightEnd.getPosition();
        worldPosition.y = this.entity.getPosition().y;
        starWalkEffect.dispatchStep(worldPosition);
    }
};


// EffectStarWalk.js
var EffectStarWalk = pc.createScript('effectStarWalk');

EffectStarWalk.prototype.initialize = function() {
    this.particles = this.entity.children.slice();
    this.entity.dispatchStep = this.dispatchStep.bind(this);
};

EffectStarWalk.prototype.dispatchStep = function(worldPosition) {
    this.entity.setPosition(worldPosition);
    this.particles.forEach(x => {
        x.particlesystem.reset();
        x.particlesystem.play();
    });
}

EffectStarWalk.prototype.update = function(dt) {

};



// PetController.js
var PetController = pc.createScript('petController');

PetController.attributes.add('petCharacterDeltaPosition', {
    type: 'vec3',
    default: [-0.64, 0, 0.3]
})

PetController.attributes.add('petShopDeltaPosition', {
    type: 'vec3',
    default: [0, -1.03, 0]
});

PetController.getInstance = function () {
    if (!PetController._instance) console.error('PetController is not initialized yet');
    return PetController._instance;
};

PetController.prototype.initialize = function () {
    PetController._app = this.app;
    if (!PetController._instance) {
        PetController._instance = this;
    }

    this._syncPositionWithPlayer = true;

    this.playerCharacter = PlayerController.getInstance().getPlayerCharacter();
    this.petContainer = this.entity.findByName('PetContainer');
    this.unlockParticles = this.entity.findByName('PetUnlockParticles');
    this.activePet = null;

    this.app.on(EventTypes.EQUIP_PET, this._equipPet, this);
    this.app.on(EventTypes.UNEQUIP_PET, this._unequipPet, this);
    this.app.on(EventTypes.SAVEDATA_LOADED, this.onSaveDataLoaded, this);
};

PetController.prototype.onSaveDataLoaded = function () {
    this._loadSavedPet();
};

PetController.prototype._loadSavedPet = function () {
    const savedPetData = ShopManager.getInstance().getSavedPet();
    if (savedPetData) {
        this._equipPet(savedPetData);
    }
};

PetController.prototype._equipPet = async function (petData, playUnlockParticles = false) {
    if (this.getActivePetName() !== petData.name) {
        this._petBeingLoadedName = petData.name;
    }

    await this._preloadPetModel(petData);

    if (playUnlockParticles) {
        this.playUnlockParticles();
    }

    if (this._petBeingLoadedName === petData.name) {
        this._petBeingLoadedName = null;
    }

    if (this.activePet) {
        this.activePet.name = petData.name;
        this.activePet.enabled = true;
    }
};

PetController.prototype._unequipPet = function (petData) {
    if (this.activePet && this.activePet.name === petData.name && !this._petBeingLoadedName) {
        this.activePet.enabled = false;
    }
};

PetController.prototype._preloadPetModel = async function (petData) {
    const petName = petData.name;
    if (!this.activePet || this.activePet.name !== petName) {
        await AssetsLoader.getInstance().loadByTag(petData.template.name);

        if (this.activePet) {
            this.activePet.destroy();
            this.activePet = null;
        }

        const instance = petData.template.resource.instantiate();
        this.petContainer.addChild(instance);
        this.activePet = instance;

        if(petData.template.name.includes('fairy')) {
            this.activePet.translateLocal(0, 2, 0);
        }
    }
}

PetController.prototype.update = function (dt) {
    if (this.activePet) {
        this.activePet.anim.speed = this.getLevelAnimSpeed();
    }

    if (this._syncPositionWithPlayer) {
        this.entity.setPosition(this.playerCharacter.getPosition().add(this.petCharacterDeltaPosition));
    }
};

PetController.prototype.getActivePet = function () {
    return this.activePet;
};


PetController.prototype.getActivePetName = function () {
    if (this.activePet) return this.activePet.name;
    return null;
};

PetController.prototype.isPetEquipped = function (petName) {
    return this.getActivePetName() === petName;
};

PetController.prototype.setPetShopPosition = function (worldPosition) {
    this.entity.setPosition(worldPosition.add(this.petShopDeltaPosition));
}

PetController.prototype.playUnlockParticles = function () {
    if (this.activePet) {
        this.app.fire(EventTypes.PLAY_SFX, 'change');
        this.unlockParticles.children.forEach(x => {
            x.particlesystem.reset();
            x.particlesystem.play();
        })
    }

}

/* anims */

PetController.prototype.playIdleAnim = function () {
    if (this.activePet) {
        this.activePet.anim.setBoolean('walking', false);
        this.activePet.anim.setBoolean('idle', true);
    }
};

PetController.prototype.playWalkingAnim = function () {
    if (this.activePet) {
        this.activePet.anim.setBoolean('idle', false);
        this.activePet.anim.setBoolean('walking', true);
    }
};


PetController.prototype.playVictoryAnim = function () {
    if (this.activePet) {
        this.activePet.anim.setBoolean('walking', false);
        this.activePet.anim.setBoolean('idle', false);
        this.activePet.anim.setTrigger('victory', true);
    }
};

PetController.prototype.getLevelAnimSpeed = function () {
    if (LevelController.getInstance().started && !LevelController.getInstance().finished) {
        return LevelController.getInstance().speedMultiplier;
    }
    return 1;
}

// FortuneMultiplier.js
var FortuneMultiplier = pc.createScript('fortuneMultiplier');

FortuneMultiplier.attributes.add('arrowPeriod', {
    type: 'number',
    default: 0.8
});

FortuneMultiplier.attributes.add('rewardValues', {
    type: 'number',
    array: true,
    default: [1.5, 2, 2.5, 3, 2.5, 2, 1.5]
});


FortuneMultiplier.attributes.add('elementColor', {
    type: 'rgb',
    default: [1, 1, 1]
});


FortuneMultiplier.attributes.add('highlightColor', {
    type: 'rgb',
    default: [0, 1, 0]
});

FortuneMultiplier.attributes.add('highlightColorCenter', {
    type: 'rgb',
    default: [1, 0, 0]
});

FortuneMultiplier.prototype.initialize = function () {
    this.multipliersContainer = this.entity.findByName('MultipliersContainer');
    this.elements = this.multipliersContainer.children;
    this.arrowIcon = this.entity.findByName('ArrowIcon');
    this.arrowInitialPosition = this.arrowIcon.getLocalPosition().clone();

    this.firstElement = this.elements[0];
    this.lastElement = this.elements[this.elements.length - 1];

    this.elements.forEach((x, index) => x.element.text = `${this.rewardValues[index]}X`);

    this.active = false;
    this.direction = this.lastElement;
    this.oppositeDirection = this.firstElement;
    this.movementTween = null;
    this._cycleCompleted = false;

    this.entity.start = this.start.bind(this);
    this.entity.getCurrentMultiplierValue = this.getCurrentMultiplierValue.bind(this);
    this.entity.stopAndGetResult = this.stopAndGetResult.bind(this);
};

FortuneMultiplier.prototype.start = function () {
    this.app.stopAllTweens(this.arrowIcon);
    this.active = true;
    this.direction = this.firstElement;
    this.switchDirection();
};

FortuneMultiplier.prototype.getCurrentMultiplierValue = function () {
    const closestElement = this.getClosestElement();
    const closestIndex = this.elements.indexOf(closestElement);
    const rewardValue = this.rewardValues[closestIndex];
    return rewardValue;
};

FortuneMultiplier.prototype.stopAndGetResult = function () {
    if (this.movementTween && this.movementTween.playing) this.movementTween.stop();
    this.active = false;
    return this.getCurrentMultiplierValue();
};

FortuneMultiplier.prototype.getClosestElement = function () {
    let closest = null;
    let minDistance = 100000;
    const arrowX = this.arrowIcon.getLocalPosition().x;
    for (let element of this.elements) {
        const distanceX = Math.abs(arrowX - element.getLocalPosition().x);
        if (distanceX < minDistance) {
            minDistance = distanceX;
            closest = element;
        }
    }
    return closest;
};

FortuneMultiplier.prototype.highlightCLosestElement = function () {
    const closest = this.getClosestElement();
    this.elements.forEach((x, index) => {
        if (x === closest) {
            x.element.color = (index === Math.floor(this.elements.length / 2)) ? this.highlightColorCenter : this.highlightColor;
        } else {
            x.element.color = this.elementColor;
        }
    });
};

FortuneMultiplier.prototype.switchDirection = function () {
    if (this.movementTween && this.movementTween.playing) this.movementTween.stop();
    this._cycleCompleted = false;
    this.direction = this.direction === this.lastElement ? this.firstElement : this.lastElement;
    this.oppositeDirection = this.direction === this.lastElement ? this.firstElement : this.lastElement;
    this.arrowIcon.setLocalPosition(this.oppositeDirection.getLocalPosition().x, this.arrowInitialPosition.y, this.arrowInitialPosition.z);
    this.active = true;
    this.movementTween = this.arrowIcon.tween(this.arrowIcon.getLocalPosition())
        .to({ x: this.direction.getLocalPosition().x }, this.arrowPeriod, pc.SineInOut)
        .onComplete(() => this._cycleCompleted = true)
        .start();
};


FortuneMultiplier.prototype.update = function (dt) {
    if (this.active) {
        if (this._cycleCompleted) {
            this.switchDirection();
        }
        this.highlightCLosestElement();
    }
};


// CharacterFinishers.js
var CharacterFinishers = pc.createScript('characterFinishers');


CharacterFinishers.prototype.initialize = function () {
    this.armatureBone = this.entity.findByName('Armature');
    this.finishersContainer = this.entity.findByName('Finishers');
    this.activeFinisherEntity = null;
    this.activeFinisherName = null;
    this.finisherAnimationKey = null;
    this.finisherEffects = [];

    this.entity.applySackEffect = this.applySackEffect.bind(this);

    if (this.entity.isPlayer()) {
        this.entity.anim.on('finisher_ended', this._dispatchFinisherAnimEnded, this);

        this.app.on(EventTypes.ACTIVATE_FINISHER, this.activateFinisher, this);
        this.app.on(EventTypes.EQUIP_FINISHER, this._equipFinisher, this);
        this.app.on(EventTypes.SAVEDATA_LOADED, this.onSaveDataLoaded, this);
        this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
    }
};


CharacterFinishers.prototype.reset = function() {
    this._clearFinisherEffects();
};

CharacterFinishers.prototype.onSaveDataLoaded = function () {
    this._loadSavedFinisher();
};


CharacterFinishers.prototype._loadSavedFinisher = function () {
    const savedFinisherData = ShopManager.getInstance().getSavedFinisher();
    if (savedFinisherData) {
        Utils.wait(5000).then(() => {
            this._preloadFinisherIfNeeded(savedFinisherData);
        })
    }
};



CharacterFinishers.prototype._equipFinisher = async function (itemData) {
    if (ShopManager.getInstance().isShopActive() && this.entity.isPlayer()) {
        this.activateFinisher(itemData);
    }
};



CharacterFinishers.prototype.applySackEffect = function () {
    const model = this.instantiateModel('Sack', 'Sack_Container');
    model.setLocalScale(pc.Vec3.ZERO);
    Utils.tweenScale(model, pc.Vec3.ONE, 0.125, pc.SineOut);

    Utils.wait(2000).then(() => {
        this._clearFinisherEffects();
    })
};


CharacterFinishers.prototype._preloadFinisherIfNeeded = async function (finisherData) {
    if (this.activeFinisherName === finisherData.name) return;

    const assetsList = [...AssetsLoader.getInstance().getAssetsByTag(finisherData.name)];
    await AssetsLoader.getInstance().loadAssets(assetsList);

    if (finisherData.template) {
        const instance = finisherData.template.resource.instantiate();
        this.finishersContainer.addChild(instance);
        this.activeFinisherEntity = instance;

        /* set root bone */
        this.entity._addArmatureRecursive(instance, this.armatureBone);
    }
}


CharacterFinishers.prototype._dispatchFinisherAnimEnded = function () {
    this._clearFinisherEffects(true);
}

CharacterFinishers.prototype.activateFinisher = async function (itemData) {
    /* remove existing effects */
    this._clearFinisherEffects();

    if (!this.activeFinisherEntity) {
        await this._preloadFinisherIfNeeded(itemData);
    };

    if (itemData.animationTriggerKey) {
        this.entity.playFinisherAnim(itemData.animationTriggerKey);
    };


    switch (itemData.name) {
        case 'bye_sweetie':
            break;
        case 'energy_blast':
            this._playEnergyBlastEffect();
            break;
        case 'knock_out':
            this._playKnockOutEffect();
            break;
        case 'giant_slap':
            this._playGiantSlapEffect();
            break;
        case 'side_kick':
            this._playSideKickEffect();
            break;
        case 'butterfly_swamp':
            this._playButterflySwampEffect();
            break;
        case 'baseball_bat':
            this._playBaseballBatEffect();
            break;
        case 'sack':
            this._playSackEffect();
            break;
        case 'smash':
            this._playSmashEffect();
            break;
        case 'pepper_spray':
            this._playPepperEffect();
            break;
        case 'magic':
            this._playMagicEffect();
            break;
        case 'watergun':
            this._playWaterGunEffect();
            break;
    }

    /** fallback */
    if (ShopManager.getInstance().isShopActive() == false) {
        Utils.wait(2500).then(() => {
            this._clearFinisherEffects();
        })
    }

}

CharacterFinishers.prototype.update = function (dt) {
    this.finisherEffects.forEach(effect => {
        if (effect.__parentContainer) {
            if (effect.__syncPosition) effect.setPosition(effect.__parentContainer.getPosition());
            if (effect.__syncRotation) effect.setEulerAngles(effect.__parentContainer.getEulerAngles());
        }
    })
};

CharacterFinishers.prototype._clearFinisherEffects = async function (animate = false) {
    if (animate) {
        const promises = [];
        this.finisherEffects.forEach(x => {
            if (x.__smoothDisappearing) {
                promises.push(Utils.tweenScale(x, pc.Vec3.ZERO, 0.15, pc.Linear));
            }
        })
        await Promise.all(promises);
    }
    while (this.finisherEffects.length > 0) this.finisherEffects.pop().destroy();
    while (this.finishersContainer.children.length > 0) this.finishersContainer.children[0].destroy();
};

CharacterFinishers.prototype.playParticlesRecursive = function (entity, delay) {
    if (entity.particlesystem) {
        Utils.wait(delay).then(() => {
            if (entity.particlesystem) {
                try {
                    entity.particlesystem.reset();
                    entity.particlesystem.play();
                } catch (e) {

                }
            }
        })
    }
    entity.children.forEach(x => this.playParticlesRecursive(x, delay));
};

CharacterFinishers.prototype.instantiateParticlesEffect = function (templateName, containerName, delay = 0) {
    const container = this.armatureBone.findByName(containerName);
    if (!container) {
        return Debug.error('Can not find finisher container named ' + containerName);
    }
    const particles = TemplateManager.getInstance().instantiate(templateName);
    if (!particles) {
        return Debug.error('Can not instantiate finisher particles ' + templateName);
    }
    this.finishersContainer.addChild(particles);
    particles.__parentContainer = container;
    particles.__syncPosition = true;
    particles.__syncRotation = true;
    this.playParticlesRecursive(particles, delay);
    this.finisherEffects.push(particles);
    return particles;
};

CharacterFinishers.prototype.instantiateModel = function (templateName, containerName) {
    const container = this.armatureBone.findByName(containerName);
    if (!container) {
        return Debug.error('Can not find finisher container named ' + containerName);
    }
    const entity = TemplateManager.getInstance().instantiate(templateName);
    if (!entity) {
        return Debug.error('Can not instantiate finisher model ' + templateName);
    }
    this.finishersContainer.addChild(entity);
    entity.__parentContainer = container;
    entity.__syncPosition = true;
    entity.__syncRotation = true;
    entity.__smoothDisappearing = true;
    this.finisherEffects.push(entity);
    return entity;
};


/** effects */

CharacterFinishers.prototype._playEnergyBlastEffect = function () {
    this.instantiateParticlesEffect('MagicSphereBlue_Particles', 'EnergyBlast_Container');
    this.instantiateParticlesEffect('Hadoken_Aura_Particles', 'EnergyBlast_Container');
    Utils.wait(100).then(() => this.app.fire(EventTypes.PLAY_SFX, 'energy_blast'));
};

CharacterFinishers.prototype._playKnockOutEffect = function () {
    this.instantiateModel('Boxing_Glove_R', 'BoxingGloveR_Container');
    this.instantiateModel('Boxing_Glove_L', 'BoxingGloveL_Container');
    Utils.wait(0).then(() => this.app.fire(EventTypes.PLAY_SFX, 'ko'));
};


CharacterFinishers.prototype._playGiantSlapEffect = function () {
    const model = this.instantiateModel('Giant_Glove_L', 'GiantGloveL_Container');
    model.setLocalScale(pc.Vec3.ZERO);
    Utils.tweenScale(model, pc.Vec3.ONE, 0.125, pc.SineOut);
    Utils.wait(600).then(() => this.app.fire(EventTypes.PLAY_SFX, 'slap'));

};

CharacterFinishers.prototype._playSideKickEffect = function () {
    /* nothing special here */
};

CharacterFinishers.prototype._playButterflySwampEffect = function () {
    const particles = this.instantiateParticlesEffect('Butterflies_Particles', 'ButterflySwamp_Container', 200);
    particles.__syncRotation = false;
    Utils.wait(350).then(() => this.app.fire(EventTypes.PLAY_SFX, 'butterfly'));
};

CharacterFinishers.prototype._playBaseballBatEffect = function () {
    const model = this.instantiateModel('Baseball_Bat', 'BaseballBat_Container');
    model.setLocalScale(pc.Vec3.ZERO);
    Utils.tweenScale(model, pc.Vec3.ONE, 0.125, pc.SineOut);
    Utils.wait(500).then(() => this.app.fire(EventTypes.PLAY_SFX, 'bat'));
};

CharacterFinishers.prototype._playSackEffect = function () {
    Utils.wait(400).then(() => {
        const targetCharacter = this.entity.isPlayer() ? PlayerController.getInstance().getOpponentCharacter() : PlayerController.getInstance().getPlayerCharacter();
        if (targetCharacter.applySackEffect) targetCharacter.applySackEffect();
    });
};


CharacterFinishers.prototype._playSmashEffect = function () {
    const model = this.instantiateModel('Frame', 'Frame_Container');
    model.setLocalScale(pc.Vec3.ZERO);
    Utils.tweenScale(model, pc.Vec3.ONE, 0.125, pc.SineOut);
};


CharacterFinishers.prototype._playPepperEffect = function () {
    const particles = this.instantiateParticlesEffect('SmokeBurstDarkSoft', 'SmokeBurstDarkSoft_Container', 200);
    particles.__syncRotation = false;

    const model = this.instantiateModel('Peppergas', 'Peppergas_Container');
    model.setLocalScale(pc.Vec3.ZERO);
    Utils.tweenScale(model, pc.Vec3.ONE, 0.125, pc.SineOut);
};


CharacterFinishers.prototype._playMagicEffect = function () {
    const particles = this.instantiateParticlesEffect('MagicStickSparks', 'MagicStickSparks_Container', 200);
    particles.__syncRotation = false;

    const model = this.instantiateModel('Magic_Stick', 'MagicStick_Container');
    model.setLocalScale(pc.Vec3.ZERO);
    Utils.tweenScale(model, pc.Vec3.ONE, 0.125, pc.SineOut);
};




CharacterFinishers.prototype._playWaterGunEffect = function () {
    const particles = this.instantiateParticlesEffect('WaterFlame', 'WaterFlame_Container', 200);
    particles.__syncRotation = false;

    const model = this.instantiateModel('Water_Gun', 'WaterGun_Container');
    model.setLocalScale(pc.Vec3.ZERO);
    Utils.tweenScale(model, pc.Vec3.ONE, 0.125, pc.SineOut);
};











// Screen_Celebrity.js
class ScreenCelebrity extends BaseWindow {

    initialize() {
        super.initialize();

        this.overlay = this.entity.findByName('Overlay');
        this.lightProjector = this.entity.findByName('LightProjectorImage');
        this.celebrityContainer = this.entity.findByName('CelebrityContainer');
        this.celebrityGameplay = this.entity.findByName('CelebrityGameplay');
        this.speechBubble = this.entity.findByName('SpeechBubble');
        this.speechBubbleText = this.speechBubble.findByName('SpeechText');
        this.celebrityAvatarBig = this.celebrityContainer.findByName('CelebrityAvatarBig');
        this.celebrityAvatarSmall = this.celebrityGameplay.findByName('CelebrityAvatarSmall');


        this.buttonsContainer = this.entity.findByName('ButtonsContainer');
        this.buttonNext = this.buttonsContainer.findByName('ButtonNext');
        this.buttonRewardedUnlock = this.buttonsContainer.findByName('ButtonRewardedUnlock');
        this.buttonNoThanks = this.buttonsContainer.findByName('ButtonNoThanks');

        this.buttonNext.on(EventTypes.BUTTON_PRESSED, this.onNextPressed, this);
        this.buttonRewardedUnlock.on(EventTypes.BUTTON_PRESSED, this.onRewardedUnlockPressed, this);
        this.buttonNoThanks.on(EventTypes.BUTTON_PRESSED, this.onNoThanksPressed, this);
    }


    _initComponents() {
        super._initComponents();
    }

    async _onShow() {

        super._onShow();

        this._rewardedAdWatched = false;
        this._celebrityUnlocked = false;
        this.buttonsContainer.enabled = false;
        this.speechBubble.enabled = false;
        this.celebrityGameplay.enabled = false;

        this.app.stopAllTweens(this.celebrityContainer);
        this.celebrityContainer.setLocalScale(pc.Vec3.ONE);

        this.app.fire(EventTypes.PLAY_SFX, 'celebrity_offer');
        this.app.fire(EventTypes.PLAY_SFX, 'crowd_ooh');

        await this._loadAndShowCelebrityContent();
    }

    _onAppeared() {

    }

    _onHide() {
        super._onHide();
    }

    async _loadAndShowCelebrityContent() {

        const celebrityData = CelebrityManager.getInstance().getCurrentCelebrityData();

        Utils.setSpriteElement(this.celebrityAvatarBig, celebrityData.icon);
        Utils.setSpriteElement(this.celebrityAvatarSmall, celebrityData.icon);

        await Utils.wait(1600);
        await this._showCelebritySpeech(celebrityData);
    }

    async _showCelebritySpeech(celebrityData) {
        this.lightProjector.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
        this.celebrityContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
        this.celebrityGameplay.enabled = true;
        this.celebrityGameplay.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);

        this.speechBubbleText.element.text = LocalizationManager.getInstance().getLocalizedText(CelebrityManager.getInstance().getIntroSpeech());
        await Utils.wait(600);
        this.speechBubble.enabled = true;
        this.speechBubble.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);

        await Utils.wait(1000);

        /* show buttons */
        this.buttonsContainer.enabled = true;
        this.buttonsContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
    }

    update(dt) {
        if (this.buttonsContainer.enabled) {
            if (this._rewardedAdWatched || this._celebrityUnlocked) {
                this.buttonNext.enabled = true;
                this.buttonRewardedUnlock.enabled = false;
                this.buttonNoThanks.enabled = false;
            } else {
                if (APIMediator.isRewardedAdAvailable('button:celebrity:unlock')) {
                    this.buttonNext.enabled = false;
                    this.buttonRewardedUnlock.enabled = true;
                    this.buttonNoThanks.enabled = true;
                } else {
                    this.buttonNext.enabled = true;
                    this.buttonRewardedUnlock.enabled = false;
                    this.buttonNoThanks.enabled = false;
                };
            }
        }
    }

    acceptOffer() {
        this.buttonsContainer.enabled = false;
        this.exit();
    }

    exit() {
        this.buttonsContainer.enabled = false;
        UIController.getInstance().hide(Constants.Screens.CELEBRITY);
    }

    async onRewardedUnlockPressed() {
        this.buttonsContainer.enabled = false;

        const result = await APIMediator.watchRewardedVideo('button:celebrity:unlock');
        if (result) {
            this._rewardedAdWatched = true;
            this.acceptOffer();
        } else {
            this.buttonsContainer.enabled = true;
        }
    }

    onNoThanksPressed() {
        CelebrityManager.getInstance().reset();
        this.exit();
    }

    onNextPressed() {
        this.acceptOffer();
    }
}

pc.registerScript(ScreenCelebrity, 'screenCelebrity');

// CelebrityManager.js
var CelebrityManager = pc.createScript('celebrityManager');

CelebrityManager.attributes.add('celebrityCollection', {
    type: 'json',
    schema: [{
        name: 'name',
        type: 'string',
        default: ''
    }, {
        name: 'displayName',
        type: 'string',
        default: ''
    }, {
        name: 'introSpeech',
        type: 'string',
        default: ''
    }, {
        name: 'entranceMessage',
        type: 'string',
        default: ''
    }, {
        name: 'answerGood1',
        type: 'string',
        default: ''
    }, {
        name: 'answerBad1',
        type: 'string',
        default: ''
    }, {
        name: 'answerGood2',
        type: 'string',
        default: ''
    }, {
        name: 'answerBad2',
        type: 'string',
        default: ''
    }, {
        name: 'answerGood3',
        type: 'string',
        default: ''
    }, {
        name: 'answerBad3',
        type: 'string',
        default: ''
    }, {
        name: 'endMessage',
        type: 'string',
        default: ''
    }, {
        name: 'icon',
        type: 'asset',
        assetType: 'sprite'
    }],

    array: true
});

CelebrityManager.getInstance = function () {
    if (!CelebrityManager._instance) console.error('CelebrityManager is not initialized yet');
    return CelebrityManager._instance;
};


CelebrityManager.prototype.initialize = function () {
    CelebrityManager._app = this.app;
    if (!CelebrityManager._instance) {
        CelebrityManager._instance = this;
    };

    this._unlockedCelebrities = [];

    this.reset();

    this.app.on(EventTypes.SAVEDATA_LOADED, this._loadSaveData, this);
};

CelebrityManager.prototype._loadSaveData = function() {
    this._unlockedCelebrities = LocalStorageController.getSavedValue(Constants.Storage.UNLOCKED_CELEBRITIES) || [];
};

CelebrityManager.prototype.reset = function () {
    this._celebrityActive = false;
    this._currentCelebrityName = null;
    this._currentCelebrityData = null;
};

CelebrityManager.prototype.getCelebrityData = function (celebrityName) {
    return this.celebrityCollection.find(x => x.name === celebrityName);
};

CelebrityManager.prototype.isCelebrityActive = function () {
    return this._celebrityActive;
};

CelebrityManager.prototype.loadCelebrity = function (celebrityName) {
    this._currentCelebrityName = celebrityName;
    this._currentCelebrityData = this.getCelebrityData(this._currentCelebrityName);
    if (!this._currentCelebrityData) {
        Debug.error('can not find celebrity data for ' + this._currentCelebrityName);
    } else {
        this._celebrityActive = true;
    }
};

CelebrityManager.prototype.markCurrentCelebrityAsCompleted = function() {
    if(this.isCelebrityActive()) {
        this._unlockedCelebrities.push(this._currentCelebrityName);
        LocalStorageController.save();
    }
};

CelebrityManager.prototype.isAlreadyCompleted = function(name) {
    return this._unlockedCelebrities.includes(name);
}

CelebrityManager.prototype.getCurrentCelebrityData = function () {
    return this._currentCelebrityData;
};

CelebrityManager.prototype.getIntroSpeech = function () {
    if (!this._currentCelebrityData) return "Intro speech"
    return this._currentCelebrityData.introSpeech;
};


CelebrityManager.prototype.getEntranceMessage = function () {
    if (!this._currentCelebrityData) return "Entrance message"
    return this._currentCelebrityData.entranceMessage;
};

CelebrityManager.prototype.getRoundCorrentMessage = function (round) {
    if (!this._currentCelebrityData) return "Correct choice " + round;
    return this._currentCelebrityData[`answerGood${round + 1}`];
};

CelebrityManager.prototype.getRoundWrongMessage = function (round) {
    if (!this._currentCelebrityData) return "Bad choice " + round;
    return this._currentCelebrityData[`answerBad${round + 1}`];
};

CelebrityManager.prototype.getEndMessage = function () {
    if (!this._currentCelebrityData) return "End message"
    return this._currentCelebrityData.endMessage;
};

CelebrityManager.prototype.getSaveData = function() {
    return this._unlockedCelebrities;  
};


CelebrityManager.prototype.update = function (dt) {

};

// CelebrityUI.js
var CelebrityUi = pc.createScript('celebrityUi');

CelebrityUi.prototype.initialize = function () {
    this.avatarGroup = this.entity.findByName('CelebrityAvatarGroup');
    this.avatarIcon = this.entity.findByName('CelebrityIcon');

    this.message = this.entity.findByName('CelebrityMessage');
    this.messageText = this.entity.findByName('MessageText');

    this.celebTarget = this.entity.findByName('CelebTargetPosition');

    this.entity.show = this.show.bind(this);
    this.entity.hide = this.hide.bind(this);
    this.entity.showMessage = this.showMessage.bind(this);
    this.entity.tweenToLeft = this.tweenToLeft.bind(this);
    this.entity.tweenToOption = this.tweenToOption.bind(this);
};

CelebrityUi.prototype.postInitialize = function () {
    this.hide();
}

CelebrityUi.prototype.show = function () {
    const celebrityData = CelebrityManager.getInstance().getCurrentCelebrityData();
    Utils.setSpriteElement(this.avatarIcon, celebrityData.icon);

    this.message.enabled = false;

    this.entity.enabled = true;
    this.entity.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);

    this.avatarGroup.setPosition(this.celebTarget.getPosition());
};

CelebrityUi.prototype.hide = function () {
    this.entity.enabled = false;
};


CelebrityUi.prototype.showMessage = function (textKey, duration = 3.25) {
    this.messageText.element.text = LocalizationManager.getInstance().getLocalizedText(textKey);
    this.app.fire(EventTypes.PLAY_SFX, 'chat_alert');

    this.message.enabled = true;
    this.message.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);

    Utils.wait(duration * 1000).then(() => {
        this.message.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
    });
};

CelebrityUi.prototype.tweenToLeft = function () {
    const targetLocalPos = Utils.worldToLocalPosition(this.avatarGroup, this.celebTarget.getPosition());
    this.app.stopAllTweens(this.avatarGroup);
    return Utils.tweenPosition(this.avatarGroup, targetLocalPos, 0.325, pc.SineOut);
};

CelebrityUi.prototype.tweenToOption = function (targetEntity) {
    this.message.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
    const targetLocalPos = Utils.worldToLocalPosition(this.avatarGroup, targetEntity.getPosition());
    this.app.stopAllTweens(this.avatarGroup);
    return Utils.tweenPosition(this.avatarGroup, targetLocalPos, 0.2, pc.SineInOut);
};

CelebrityUi.prototype.update = function (dt) {

};


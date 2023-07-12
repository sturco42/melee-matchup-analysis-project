"""hash pass

Revision ID: 3005c4d4e045
Revises: 
Create Date: 2023-07-11 22:49:20.108662

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3005c4d4e045'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=True))
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('_password_hash')

    # ### end Alembic commands ###
